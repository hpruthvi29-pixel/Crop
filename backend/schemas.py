from pydantic import BaseModel, Field
from typing import Optional


class PredictionRequest(BaseModel):
    nitrogen: float = Field(..., ge=0, le=140, description="Nitrogen content in soil (kg/ha)")
    phosphorus: float = Field(..., ge=0, le=145, description="Phosphorus content in soil (kg/ha)")
    potassium: float = Field(..., ge=0, le=205, description="Potassium content in soil (kg/ha)")
    temperature: float = Field(..., ge=0, le=50, description="Temperature in Celsius")
    humidity: float = Field(..., ge=0, le=100, description="Relative humidity in %")
    ph: float = Field(..., ge=0, le=14, description="pH value of soil")
    rainfall: float = Field(..., ge=0, le=300, description="Rainfall in mm")

    class Config:
        json_schema_extra = {
            "example": {
                "nitrogen": 90,
                "phosphorus": 42,
                "potassium": 43,
                "temperature": 20.87,
                "humidity": 82.00,
                "ph": 6.5,
                "rainfall": 202.93
            }
        }


class CropRecommendation(BaseModel):
    crop_name: str
    confidence: float
    recommendations: dict


class PredictionResponse(BaseModel):
    success: bool
    crop_name: str
    confidence: float
    recommendations: dict
    message: Optional[str] = None


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    version: str
