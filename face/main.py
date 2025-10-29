from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import cv2
import numpy as np
import face_recognition
from io import BytesIO
from PIL import Image

class FaceVerificationSystem:
    def __init__(self, data_dir="known_faces", verification_threshold=70.0):
        self.data_dir = data_dir
        self.verification_threshold = verification_threshold
        self.known_encodings = []
        self.known_names = []

    def load_data(self):
        """Load all known faces from data directory"""
        if not os.path.exists(self.data_dir):
            print(f"⚠️ Directory '{self.data_dir}' not found. Creating it.")
            os.makedirs(self.data_dir)
            return

        for filename in os.listdir(self.data_dir):
            if filename.lower().endswith((".jpg", ".jpeg", ".png")):
                path = os.path.join(self.data_dir, filename)
                image = face_recognition.load_image_file(path)
                encodings = face_recognition.face_encodings(image)
                if encodings:
                    self.known_encodings.append(encodings[0])
                    self.known_names.append(os.path.splitext(filename)[0])

        print(f"✅ Loaded {len(self.known_encodings)} known faces.")

    def process_verification(self, encoding):
        """Compare uploaded face to known faces"""
        if not self.known_encodings:
            return {"verified": False, "name": "Unknown", "similarity": 0.0}

        distances = face_recognition.face_distance(self.known_encodings, encoding)
        best_match_index = np.argmin(distances)
        best_distance = distances[best_match_index]

        similarity = (1 - best_distance) * 100
        verified = similarity >= self.verification_threshold

        return {
            "verified": verified,
            "name": self.known_names[best_match_index],
            "similarity": round(similarity, 2),
        }


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

system = FaceVerificationSystem(verification_threshold=70.0)
system.load_data()

@app.post("/verify")
async def verify_face_api(file: UploadFile = File(...)):
    """Receives an image from frontend and verifies it"""
    try:
        image_data = await file.read()
        img = Image.open(BytesIO(image_data))
        frame = np.array(img.convert("RGB"))

        face_locations = face_recognition.face_locations(frame)
        if not face_locations:
            return {"status": "error", "message": "No face detected"}
        if len(face_locations) > 1:
            return {"status": "error", "message": "Multiple faces detected"}

        encodings = face_recognition.face_encodings(frame, face_locations)
        if not encodings:
            return {"status": "error", "message": "Could not encode face"}

        result = system.process_verification(encodings[0])

        return {
            "status": "success",
            "verified": result["verified"],
            "name": result["name"],
            "similarity": result["similarity"],
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
