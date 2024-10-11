from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse
import os
from app.services.image_service import upscale_image

router = APIRouter()

UPLOAD_FOLDER = "app/static/uploads"

@router.post("/upscale")
async def upscale_image_route(file: UploadFile = File(...)):
    image_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(image_path, "wb") as buffer:
        buffer.write(await file.read())
        
    upscale_image_path = upscale_image(image_path)
    
    return FileResponse(upscale_image_path, media_type="image/png")


@router.get("/")
async def test():
    return {"message": "Hello World"}

# @router.get("/download")
# async def download_image_route():
#     return FileResponse("app/static/uploads/upscaled_image.png", media_type="image/png")