from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from schemas import HealthResponse
from routers.predict import router as predict_router, load_model, model_loaded
import uvicorn


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: load ML model
    load_model()
    yield
    # Shutdown: cleanup (if needed)


app = FastAPI(
    title="Smart Crop Recommendation API",
    description="AI-powered crop recommendation system based on soil and environmental data.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# ─── CORS Configuration ────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Include Routers ───────────────────────────────────────────────────────────
app.include_router(predict_router, tags=["Predictions"])


# ─── Health Check ──────────────────────────────────────────────────────────────
@app.get("/health", response_model=HealthResponse, tags=["System"])
async def health_check():
    return HealthResponse(
        status="healthy",
        model_loaded=model_loaded,
        version="1.0.0"
    )


@app.get("/", tags=["System"])
async def root():
    return {
        "message": "Smart Crop Recommendation API",
        "docs": "/docs",
        "health": "/health",
        "version": "1.0.0"
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
