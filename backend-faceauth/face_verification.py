import cv2
import numpy as np
from deepface import DeepFace
import os

class FaceVerificationSystem:
    def __init__(self, verification_threshold=0.7):
        self.verification_threshold = verification_threshold

    def verify_faces(self, image1_path, image2_path):
        """
        Verifies if two face images belong to the same person.
        Returns True if match found, else False.
        """
        try:
            result = DeepFace.verify(
                img1_path=image1_path,
                img2_path=image2_path,
                model_name='Facenet',
                enforce_detection=False
            )

            distance = result['distance']
            verified = distance < self.verification_threshold
            return verified, distance

        except Exception as e:
            print(f"Error verifying faces: {e}")
            return False, None
