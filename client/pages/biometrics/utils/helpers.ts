import * as faceapi from "face-api.js";
export async function loadModels() {
    const MODEL_URL = "/models";
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(
            `${MODEL_URL}/tiny_face_detector`,
        ),
        faceapi.nets.faceLandmark68Net.loadFromUri(
            `${MODEL_URL}/face_landmark_68`,
        ),
        faceapi.nets.faceRecognitionNet.loadFromUri(
            `${MODEL_URL}/face_recognition`,
        ),
        faceapi.nets.faceExpressionNet.loadFromUri(
            `${MODEL_URL}/face_expression`,
        ),
        faceapi.nets.ageGenderNet.loadFromUri(`${MODEL_URL}/age_gender_model`),
    ]);
}
