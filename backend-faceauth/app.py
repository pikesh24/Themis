import os
import io
import base64
from typing import Dict, Any
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deepface import DeepFace
from PIL import Image

app = FastAPI(title="Face Verification Backend (DeepFace)")

# CORS setup (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Folder for registered faces
FACES_FOLDER = "faces"
os.makedirs(FACES_FOLDER, exist_ok=True)

MODEL_NAME = "Facenet"        # DeepFace model
DISTANCE_THRESHOLD = 0.5      # distance < 0.5 => similarity > 50%

# Helper: list registered faces
def list_faces():
    files = [f for f in os.listdir(FACES_FOLDER) if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))]
    return files

# ---------- BASE64 UTILITIES ----------

class ImageBase64(BaseModel):
    image_base64: str

def _decode_base64_image(data_url: str) -> Image.Image:
    if "," in data_url:
        _, data = data_url.split(",", 1)
    else:
        data = data_url
    img_bytes = base64.b64decode(data)
    return Image.open(io.BytesIO(img_bytes)).convert("RGB")

def _image_to_temp_path(img: Image.Image, tmp_name: str = "tmp_upload.jpg") -> str:
    path = os.path.join(".", tmp_name)
    img.save(path, format="JPEG")
    return path

# ---------- ROUTES ----------

@app.post("/verify-base64")
async def verify_base64(payload: ImageBase64) -> Dict[str, Any]:
    """
    Verify face using base64-encoded image (used by frontend).
    """
    faces = list_faces()
    if not faces:
        raise HTTPException(status_code=400, detail="No registered faces in backend/faces/")

    try:
        img = _decode_base64_image(payload.image_base64)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid base64 image: {e}")

    tmp_path = _image_to_temp_path(img, tmp_name="tmp_upload.jpg")

    best = {"name": None, "distance": None, "similarity": 0.0, "verified": False}

    for fn in faces:
        reg_path = os.path.join(FACES_FOLDER, fn)
        try:
            res = DeepFace.verify(img1_path=tmp_path, img2_path=reg_path,
                                  model_name=MODEL_NAME, enforce_detection=False)
            dist = res.get("distance", None)
            if dist is None:
                continue
            similarity = max(0.0, (1.0 - dist) * 100.0)
            if best["distance"] is None or dist < best["distance"]:
                best = {
                    "name": os.path.splitext(fn)[0],
                    "distance": dist,
                    "similarity": round(similarity, 2),
                    "verified": similarity > 50.0
                }
        except Exception as e:
            print(f"Warning: skipped {reg_path} due to {e}")
            continue

    os.remove(tmp_path)
    return best

@app.post("/verify-face")
async def verify_face(file: UploadFile = File(...)):
    """
    Verify face using a direct image upload (used for Postman/admin testing).
    """
    faces = list_faces()
    if not faces:
        raise HTTPException(status_code=400, detail="No registered faces in backend/faces/")

    tmp_path = "tmp_verify.jpg"
    contents = await file.read()
    with open(tmp_path, "wb") as f:
        f.write(contents)

    best = {"name": None, "distance": None, "similarity": 0.0, "verified": False}

    for fn in faces:
        reg_path = os.path.join(FACES_FOLDER, fn)
        try:
            res = DeepFace.verify(img1_path=tmp_path, img2_path=reg_path,
                                  model_name=MODEL_NAME, enforce_detection=False)
            dist = res.get("distance", None)
            if dist is None:
                continue
            similarity = max(0.0, (1.0 - dist) * 100.0)
            if best["distance"] is None or dist < best["distance"]:
                best = {
                    "name": os.path.splitext(fn)[0],
                    "distance": dist,
                    "similarity": round(similarity, 2),
                    "verified": similarity > 50.0
                }
        except Exception as e:
            print(f"Warning: skipped {reg_path} due to {e}")
            continue

    os.remove(tmp_path)
    return best

@app.post("/upload-face")
async def upload_face(file: UploadFile = File(...)):
    """
    Upload a new face image to backend/faces.
    """
    filename = file.filename
    if not filename:
        raise HTTPException(status_code=400, detail="No filename provided")

    if not filename.lower().endswith((".jpg", ".jpeg", ".png")):
        raise HTTPException(status_code=400, detail="Unsupported file type")

    save_path = os.path.join(FACES_FOLDER, filename)
    contents = await file.read()
    with open(save_path, "wb") as f:
        f.write(contents)
    return {"status": "ok", "saved_as": save_path}

@app.get("/list-registered")
async def api_list_registered():
    """
    List all registered faces in the backend/faces directory.
    """
    files = list_faces()
    names = [os.path.splitext(f)[0] for f in files]
    return {"count": len(names), "names": names}
