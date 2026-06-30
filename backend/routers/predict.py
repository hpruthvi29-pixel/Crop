import os
import numpy as np
import joblib
from fastapi import APIRouter, HTTPException
from schemas import PredictionRequest, PredictionResponse

router = APIRouter()

# ─── Crop metadata for recommendations ────────────────────────────────────────
CROP_RECOMMENDATIONS = {
    "rice": {
        "season": "Kharif (June–November)",
        "water": "High (1200–2000 mm)",
        "soil": "Clay loam, alluvial soil",
        "fertilizer": "Urea, DAP, MOP",
        "harvest_duration": "90–120 days",
        "description": "Rice thrives in waterlogged conditions with high humidity and warm temperatures."
    },
    "maize": {
        "season": "Kharif & Rabi",
        "water": "Moderate (500–800 mm)",
        "soil": "Well-drained loamy soil",
        "fertilizer": "NPK 120:60:40 kg/ha",
        "harvest_duration": "80–95 days",
        "description": "Maize is a versatile cereal crop that grows well in warm weather with moderate rainfall."
    },
    "chickpea": {
        "season": "Rabi (October–March)",
        "water": "Low (300–500 mm)",
        "soil": "Sandy loam, light textured soil",
        "fertilizer": "DAP 25 kg/ha + Rhizobium",
        "harvest_duration": "95–105 days",
        "description": "Chickpea is a drought-tolerant legume that grows in cool, dry conditions."
    },
    "kidneybeans": {
        "season": "Kharif & Zaid",
        "water": "Moderate (600–800 mm)",
        "soil": "Sandy loam to loam",
        "fertilizer": "NPK 30:60:30 kg/ha",
        "harvest_duration": "80–120 days",
        "description": "Kidney beans are protein-rich legumes that prefer moderate climates."
    },
    "pigeonpeas": {
        "season": "Kharif (June–October)",
        "water": "Low to Moderate (600–1000 mm)",
        "soil": "Well-drained sandy loam",
        "fertilizer": "NPK 20:50:20 kg/ha",
        "harvest_duration": "120–180 days",
        "description": "Pigeonpeas are drought-resistant legumes excellent for intercropping."
    },
    "mothbeans": {
        "season": "Kharif",
        "water": "Very Low (200–350 mm)",
        "soil": "Sandy to sandy loam",
        "fertilizer": "Rhizobium culture + 10:30:20 kg/ha",
        "harvest_duration": "60–90 days",
        "description": "Moth beans are extremely drought-tolerant and suitable for arid regions."
    },
    "mungbean": {
        "season": "Kharif & Zaid",
        "water": "Low (300–500 mm)",
        "soil": "Sandy loam, well-drained",
        "fertilizer": "NPK 20:40:20 kg/ha",
        "harvest_duration": "60–75 days",
        "description": "Mung beans are fast-growing legumes requiring warm temperatures."
    },
    "blackgram": {
        "season": "Kharif & Rabi",
        "water": "Moderate (500–700 mm)",
        "soil": "Loamy to clay loam",
        "fertilizer": "Rhizobium + NPK 20:40:20 kg/ha",
        "harvest_duration": "70–85 days",
        "description": "Black gram is a pulse crop valued for its high protein content."
    },
    "lentil": {
        "season": "Rabi (October–March)",
        "water": "Low (300–400 mm)",
        "soil": "Loam to clay loam",
        "fertilizer": "NPK 20:40:20 kg/ha + Rhizobium",
        "harvest_duration": "80–100 days",
        "description": "Lentils thrive in cool, dry climates and are rich in protein and fiber."
    },
    "pomegranate": {
        "season": "Year-round (tropical)",
        "water": "Low to Moderate (500–800 mm)",
        "soil": "Deep loamy soil",
        "fertilizer": "NPK 625:375:250 g/plant/year",
        "harvest_duration": "5–7 months after flowering",
        "description": "Pomegranate is a drought-tolerant fruit crop suitable for semi-arid regions."
    },
    "banana": {
        "season": "Year-round",
        "water": "High (1200–2200 mm)",
        "soil": "Rich, well-drained loamy soil",
        "fertilizer": "NPK 200:60:220 g/plant",
        "harvest_duration": "9–12 months",
        "description": "Bananas require hot, humid conditions and fertile soil for best yields."
    },
    "mango": {
        "season": "Summer (March–June)",
        "water": "Moderate (750–1250 mm)",
        "soil": "Deep alluvial loam",
        "fertilizer": "NPK 1000:500:1000 g/tree/year",
        "harvest_duration": "3–6 months after flowering",
        "description": "Mango is the king of fruits, thriving in tropical and subtropical climates."
    },
    "grapes": {
        "season": "Summer (March–June)",
        "water": "Moderate (700–900 mm)",
        "soil": "Sandy loam, well-drained",
        "fertilizer": "NPK 150:75:150 kg/ha",
        "harvest_duration": "4–6 months after pruning",
        "description": "Grapes are perennial vines that require specific temperature and humidity conditions."
    },
    "watermelon": {
        "season": "Summer (February–May)",
        "water": "Moderate (400–600 mm)",
        "soil": "Sandy loam, well-drained",
        "fertilizer": "NPK 100:50:50 kg/ha",
        "harvest_duration": "80–100 days",
        "description": "Watermelon thrives in hot, dry weather with adequate irrigation."
    },
    "muskmelon": {
        "season": "Summer (February–May)",
        "water": "Moderate (400–600 mm)",
        "soil": "Sandy loam, pH 6.0–7.0",
        "fertilizer": "NPK 75:50:50 kg/ha",
        "harvest_duration": "75–90 days",
        "description": "Muskmelon grows best in warm, sunny weather with low humidity."
    },
    "apple": {
        "season": "Summer–Autumn",
        "water": "Moderate (1000–1250 mm)",
        "soil": "Well-drained loamy soil",
        "fertilizer": "NPK 70:35:70 kg/ha",
        "harvest_duration": "130–180 days",
        "description": "Apple requires cold winters and mild summers in hilly regions."
    },
    "orange": {
        "season": "Winter (November–January)",
        "water": "Moderate (1000–1200 mm)",
        "soil": "Sandy loam, pH 5.5–7.0",
        "fertilizer": "NPK 1200:240:600 g/tree/year",
        "harvest_duration": "7–12 months after fruit set",
        "description": "Oranges thrive in subtropical climates with distinct dry and wet seasons."
    },
    "papaya": {
        "season": "Year-round",
        "water": "Moderate (1000–1500 mm)",
        "soil": "Well-drained sandy loam",
        "fertilizer": "NPK 250:250:500 g/plant/year",
        "harvest_duration": "9–11 months",
        "description": "Papaya is a fast-growing tropical fruit requiring warm temperatures year-round."
    },
    "coconut": {
        "season": "Year-round (tropical)",
        "water": "High (1500–2500 mm)",
        "soil": "Sandy loam, coastal soil",
        "fertilizer": "NPK 500:320:1200 g/palm/year",
        "harvest_duration": "12 months (perennial)",
        "description": "Coconut palms thrive in coastal tropical climates with high humidity."
    },
    "cotton": {
        "season": "Kharif (May–November)",
        "water": "Moderate (700–1200 mm)",
        "soil": "Black cotton soil (Vertisol)",
        "fertilizer": "NPK 180:80:80 kg/ha",
        "harvest_duration": "150–180 days",
        "description": "Cotton requires long growing season, high temperatures and moderate rainfall."
    },
    "jute": {
        "season": "Kharif (March–July)",
        "water": "High (1000–2000 mm)",
        "soil": "Alluvial sandy loam",
        "fertilizer": "NPK 60:30:30 kg/ha",
        "harvest_duration": "120–150 days",
        "description": "Jute is a fiber crop that grows best in humid tropical conditions."
    },
    "coffee": {
        "season": "Year-round (perennial)",
        "water": "High (1500–2500 mm)",
        "soil": "Well-drained, slightly acidic loam",
        "fertilizer": "NPK 300:100:200 kg/ha",
        "harvest_duration": "2–4 years for first harvest",
        "description": "Coffee thrives in tropical highlands with moderate temperature and high rainfall."
    }
}

# ─── Model loading ─────────────────────────────────────────────────────────────
# Search paths for models
MODEL_PATHS = [
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "models", "best_crop_model.pkl")),
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "models", "best_crop_model.pkl")),
    os.path.abspath(os.path.join(os.path.dirname(__file__), "models", "crop_model.pkl")),
]

ENCODER_PATHS = [
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "models", "label_encoder.pkl")),
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "models", "label_encoder.pkl")),
    os.path.abspath(os.path.join(os.path.dirname(__file__), "models", "label_encoder.pkl")),
]

model = None
label_encoder = None
model_loaded = False

def load_model():
    global model, label_encoder, model_loaded
    
    # Try finding model file
    model_file = None
    for p in MODEL_PATHS:
        if os.path.exists(p):
            model_file = p
            break
            
    # Try finding encoder file
    encoder_file = None
    for p in ENCODER_PATHS:
        if os.path.exists(p):
            encoder_file = p
            break

    try:
        if model_file and encoder_file:
            model = joblib.load(model_file)
            label_encoder = joblib.load(encoder_file)
            model_loaded = True
            print(f"[*] ML model loaded successfully from {model_file}")
        else:
            raise FileNotFoundError("Model or encoder files not found in search paths")
    except Exception as e:
        print(f"[!] Error loading model: {e}. Running in demo mode.")
        model_loaded = False


def demo_predict(data: PredictionRequest) -> tuple[str, float]:
    """Fallback demo prediction based on simple rules when model is unavailable."""
    n, p, k = data.nitrogen, data.phosphorus, data.potassium
    temp, humidity, ph, rainfall = data.temperature, data.humidity, data.ph, data.rainfall

    if rainfall > 200 and humidity > 80 and temp > 20:
        return "rice", 0.85
    elif temp > 25 and humidity < 60 and rainfall < 100:
        return "cotton", 0.78
    elif ph < 6.5 and temp > 25 and humidity > 75:
        return "coffee", 0.81
    elif rainfall < 50 and humidity < 50:
        return "mothbeans", 0.74
    elif temp < 20 and rainfall < 100:
        return "lentil", 0.77
    elif temp > 30 and humidity > 85:
        return "coconut", 0.82
    elif k > 150 and humidity > 80:
        return "banana", 0.80
    else:
        return "maize", 0.72


@router.post("/predict", response_model=PredictionResponse)
async def predict_crop(request: PredictionRequest):
    """Predict the most suitable crop based on soil and environmental conditions."""
    try:
        if model_loaded and model is not None:
            # Create a DataFrame with the exact feature names the model was trained on
            import pandas as pd
            features_df = pd.DataFrame([{
                'N': request.nitrogen,
                'P': request.phosphorus,
                'K': request.potassium,
                'temperature': request.temperature,
                'humidity': request.humidity,
                'ph': request.ph,
                'rainfall': request.rainfall
            }])
            
            prediction = model.predict(features_df)
            probabilities = model.predict_proba(features_df)[0]
            confidence = float(np.max(probabilities))

            if label_encoder is not None:
                crop_name = label_encoder.inverse_transform(prediction)[0]
            else:
                crop_name = str(prediction[0])
        else:
            crop_name, confidence = demo_predict(request)

        crop_name_lower = crop_name.lower()
        recommendations = CROP_RECOMMENDATIONS.get(
            crop_name_lower,
            {
                "season": "Varies by region",
                "water": "Moderate",
                "soil": "Loamy soil",
                "fertilizer": "Balanced NPK",
                "harvest_duration": "90–120 days",
                "description": f"{crop_name} is a suitable crop for your conditions."
            }
        )

        return PredictionResponse(
            success=True,
            crop_name=crop_name.capitalize(),
            confidence=round(confidence * 100, 2),
            recommendations=recommendations,
            message="Prediction successful" + ("" if model_loaded else " (demo mode)")
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
