from fastapi import FastAPI
from app.routes.image_routes import router as image_router

app = FastAPI()

app.include_router(image_router)