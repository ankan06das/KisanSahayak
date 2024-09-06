from fastapi import FastAPI 
from pydantic import BaseModel 
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import predict as pd
import json

class Image(BaseModel):
    userId: str
    url: str
    location: str
    rainAct: float
    rainNorm: float
    rainDep: float
    soil_N: float
    soil_P: float
    soil_K: float
    soil_pH: float
    temp: float
    hum: float

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"    
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    
@app.post("/predict")
async def getPrediction (req: Image):
    print(req)
    pd.download_image(req.url, save_as='./temp.jpg')
    crop, attribute = pd.predict_class('./temp.jpg')
    recomms_dict = json.load(open("./recommendations.json"))
    print(crop,attribute)
    dict_key = crop + "___" + attribute
    return {
        "userId":req.userId,
        "url":req.url,
        "location":req.location,
        "crop": crop,
        "rainAct":req.rainAct,
        "rainNorm":req.rainNorm,
        "rainDep":req.rainDep,
        "soil_N":req.soil_N,
        "soil_K":req.soil_K,
        "soil_P":req.soil_P,
        "soil_pH":req.soil_pH,
        "temp":req.temp,
        "hum":req.hum,
        "disease": attribute,
        "disease_details": recomms_dict[dict_key]["disease_details"] if attribute != "Healthy" else [],
        "recomm": recomms_dict[dict_key]["recommendations"] if attribute != "Healthy" else [],
        "pesticides": recomms_dict[dict_key]    ["pesticides"] if attribute != "Healthy" else []
    }
 