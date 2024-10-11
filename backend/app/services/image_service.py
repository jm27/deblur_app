from PIL import Image
import torch
from diffusers import StableDiffusionUpscalePipeline

device = "cuda" if torch.cuda.is_available() else "cpu"

model_id = "stabilityai/stable-diffusion-x4-upscaler"
# pipeline = StableDiffusionUpscalePipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipeline = StableDiffusionUpscalePipeline.from_pretrained(model_id)
pipeline.to(device)

def upscale_image(image_path: str) -> str:
    low_res_image = Image.open(image_path)
    
    upscaled_image = pipeline(prompt="", image=low_res_image).images[0]
    
    upscaled_image_path = image_path.replace(".jpg", "_upscaled.png")
    upscaled_image.save(upscaled_image_path)
    
    return upscaled_image_path

