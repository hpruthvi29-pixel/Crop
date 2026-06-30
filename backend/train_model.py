"""
Train and save the crop recommendation model.
Run this script to generate crop_model.pkl and label_encoder.pkl

Usage:
    python train_model.py

If you already have the model files, place them in the models/ directory.
"""

import numpy as np
import joblib
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# ─── Crop Dataset (N, P, K, Temperature, Humidity, pH, Rainfall, Label) ───────
# This is a representative dataset. Replace with your full crop_recommendation.csv if available.

CROPS = [
    "rice", "maize", "chickpea", "kidneybeans", "pigeonpeas",
    "mothbeans", "mungbean", "blackgram", "lentil", "pomegranate",
    "banana", "mango", "grapes", "watermelon", "muskmelon",
    "apple", "orange", "papaya", "coconut", "cotton", "jute", "coffee"
]

# Seed data: [N, P, K, temp, humidity, ph, rainfall, crop]
RAW_DATA = []

# Rice: high rainfall, warm, high humidity
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(60, 120), np.random.uniform(30, 60), np.random.uniform(30, 55),
        np.random.uniform(20, 27), np.random.uniform(80, 90), np.random.uniform(5.5, 7.0),
        np.random.uniform(180, 270), "rice"
    ])

# Maize: moderate everything
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(60, 100), np.random.uniform(35, 65), np.random.uniform(15, 35),
        np.random.uniform(18, 27), np.random.uniform(55, 75), np.random.uniform(5.5, 7.5),
        np.random.uniform(50, 110), "maize"
    ])

# Chickpea: low rainfall, cool, low humidity
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(15, 45), np.random.uniform(50, 90), np.random.uniform(60, 100),
        np.random.uniform(17, 25), np.random.uniform(14, 25), np.random.uniform(5.5, 8.0),
        np.random.uniform(60, 100), "chickpea"
    ])

# Kidneybeans
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(15, 40), np.random.uniform(55, 90), np.random.uniform(15, 25),
        np.random.uniform(18, 27), np.random.uniform(17, 22), np.random.uniform(5.5, 7.5),
        np.random.uniform(100, 150), "kidneybeans"
    ])

# Pigeonpeas
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(15, 40), np.random.uniform(55, 90), np.random.uniform(15, 30),
        np.random.uniform(25, 35), np.random.uniform(45, 65), np.random.uniform(5.0, 7.0),
        np.random.uniform(140, 200), "pigeonpeas"
    ])

# Mothbeans: very dry
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(20, 50), np.random.uniform(40, 70), np.random.uniform(15, 30),
        np.random.uniform(24, 36), np.random.uniform(47, 58), np.random.uniform(3.5, 7.5),
        np.random.uniform(40, 65), "mothbeans"
    ])

# Mungbean
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(15, 45), np.random.uniform(35, 65), np.random.uniform(15, 30),
        np.random.uniform(25, 35), np.random.uniform(82, 90), np.random.uniform(6.2, 7.5),
        np.random.uniform(48, 70), "mungbean"
    ])

# Blackgram
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(30, 65), np.random.uniform(55, 80), np.random.uniform(15, 30),
        np.random.uniform(28, 36), np.random.uniform(63, 72), np.random.uniform(5.7, 7.2),
        np.random.uniform(60, 90), "blackgram"
    ])

# Lentil: cool, low water
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(15, 30), np.random.uniform(25, 55), np.random.uniform(15, 25),
        np.random.uniform(18, 27), np.random.uniform(65, 72), np.random.uniform(6.0, 7.5),
        np.random.uniform(35, 60), "lentil"
    ])

# Pomegranate: warm, low water
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(15, 25), np.random.uniform(15, 30), np.random.uniform(195, 210),
        np.random.uniform(21, 27), np.random.uniform(85, 95), np.random.uniform(5.5, 7.5),
        np.random.uniform(100, 115), "pomegranate"
    ])

# Banana: hot, humid, high K
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(95, 115), np.random.uniform(60, 80), np.random.uniform(45, 65),
        np.random.uniform(25, 31), np.random.uniform(78, 90), np.random.uniform(5.5, 7.0),
        np.random.uniform(100, 145), "banana"
    ])

# Mango: warm, moderate
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(15, 30), np.random.uniform(15, 25), np.random.uniform(25, 45),
        np.random.uniform(24, 36), np.random.uniform(45, 60), np.random.uniform(5.5, 7.5),
        np.random.uniform(90, 125), "mango"
    ])

# Grapes: warm, low humidity
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(15, 30), np.random.uniform(15, 30), np.random.uniform(195, 210),
        np.random.uniform(23, 29), np.random.uniform(80, 90), np.random.uniform(5.5, 7.0),
        np.random.uniform(65, 80), "grapes"
    ])

# Watermelon: hot, dry
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(95, 115), np.random.uniform(10, 20), np.random.uniform(45, 65),
        np.random.uniform(25, 35), np.random.uniform(82, 92), np.random.uniform(6.0, 7.0),
        np.random.uniform(35, 65), "watermelon"
    ])

# Muskmelon
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(95, 115), np.random.uniform(10, 20), np.random.uniform(45, 65),
        np.random.uniform(28, 38), np.random.uniform(90, 98), np.random.uniform(6.0, 7.5),
        np.random.uniform(20, 40), "muskmelon"
    ])

# Apple: cold, humid
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(0, 20), np.random.uniform(120, 145), np.random.uniform(195, 210),
        np.random.uniform(21, 25), np.random.uniform(90, 95), np.random.uniform(5.5, 7.0),
        np.random.uniform(100, 130), "apple"
    ])

# Orange
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(0, 20), np.random.uniform(10, 20), np.random.uniform(8, 18),
        np.random.uniform(22, 33), np.random.uniform(90, 95), np.random.uniform(6.0, 7.5),
        np.random.uniform(100, 125), "orange"
    ])

# Papaya: warm, high rainfall
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(45, 60), np.random.uniform(40, 60), np.random.uniform(40, 60),
        np.random.uniform(33, 38), np.random.uniform(90, 95), np.random.uniform(6.0, 7.0),
        np.random.uniform(120, 160), "papaya"
    ])

# Coconut: coastal, hot, high humidity
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(0, 20), np.random.uniform(10, 20), np.random.uniform(25, 40),
        np.random.uniform(26, 34), np.random.uniform(90, 98), np.random.uniform(5.0, 8.0),
        np.random.uniform(175, 225), "coconut"
    ])

# Cotton: warm, moderate
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(110, 130), np.random.uniform(40, 60), np.random.uniform(15, 25),
        np.random.uniform(23, 32), np.random.uniform(77, 88), np.random.uniform(6.0, 8.0),
        np.random.uniform(60, 100), "cotton"
    ])

# Jute: hot, very humid
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(70, 90), np.random.uniform(40, 65), np.random.uniform(35, 50),
        np.random.uniform(23, 27), np.random.uniform(78, 90), np.random.uniform(6.0, 7.0),
        np.random.uniform(160, 200), "jute"
    ])

# Coffee: acidic, high rainfall
for _ in range(100):
    RAW_DATA.append([
        np.random.uniform(95, 115), np.random.uniform(25, 35), np.random.uniform(25, 35),
        np.random.uniform(25, 29), np.random.uniform(58, 68), np.random.uniform(6.5, 7.0),
        np.random.uniform(150, 200), "coffee"
    ])

# ─── Prepare Data ──────────────────────────────────────────────────────────────
np.random.seed(42)
data = np.array(RAW_DATA, dtype=object)
X = data[:, :-1].astype(float)
y = data[:, -1]

# Encode labels
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# ─── Train Model ───────────────────────────────────────────────────────────────
clf = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
clf.fit(X_train, y_train)

# Evaluate
y_pred = clf.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"[*] Model trained! Accuracy: {acc:.4f} ({acc*100:.2f}%)")

# ─── Save Models ───────────────────────────────────────────────────────────────
os.makedirs("models", exist_ok=True)
joblib.dump(clf, "models/crop_model.pkl")
joblib.dump(le, "models/label_encoder.pkl")
print("[*] Models saved to models/crop_model.pkl and models/label_encoder.pkl")
print(f"   Classes: {list(le.classes_)}")
