from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from models.forecaster import SalesForecaster

app = FastAPI(title="Sales Prediction Simulator API")

# Setup CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the ML forecaster class globally to reuse the synthetic dataset
forecaster = SalesForecaster()

class PredictionRequest(BaseModel):
    models: List[str]

@app.get("/api/eda")
def get_eda():
    """Devuelve los datos historicos para analisis exploratorio"""
    return {"data": forecaster.get_eda_data()}

@app.post("/api/predict")
def predict_sales(req: PredictionRequest):
    """Ejecuta los modelos solicitados y devuelve la prediccion"""
    results = forecaster.run_predictions(req.models)
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
