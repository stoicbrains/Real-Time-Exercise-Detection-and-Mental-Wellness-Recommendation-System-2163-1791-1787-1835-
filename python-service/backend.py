# Import required libraries
from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np

# Check MediaPipe compatibility (some versions may break mp.solutions)
if not hasattr(mp, "solutions"):
    raise ImportError(
        "MediaPipe is missing mp.solutions (common with mediapipe>=0.10.31). "
        "From the python-service folder run: pip install -r requirements.txt"
    )

# Initialize Flask app and enable CORS (for frontend communication)
app = Flask(__name__)
CORS(app)

# Initialize MediaPipe Pose Detection
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Utility to draw pose landmarks (skeleton)
mp_drawing = mp.solutions.drawing_utils

# Global variables
cap = None                # Webcam capture object
curl_count = 0           # Total bicep curls counted
curl_position = "down"   # Current arm state: "up" or "down"


def calculate_angle(a, b, c):
    """
    Calculate angle between three points:
    a = shoulder, b = elbow, c = wrist

    This helps determine whether the arm is bent or extended.
    """
    a = np.array(a)  # Shoulder
    b = np.array(b)  # Elbow
    c = np.array(c)  # Wrist

    # Calculate angle using arctan2
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    # Normalize angle to range 0–180
    if angle > 180.0:
        angle = 360 - angle

    return angle


@app.route("/start", methods=["GET"])
def start_camera():
    """
    Start webcam, reset curl count,
    and stream video with real-time curl detection.
    """
    global cap, curl_count, curl_position

    curl_count = 0  # Reset counter

    # Open webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        return jsonify({"error": "Could not access webcam"}), 500

    def generate_frames():
        """
        Generator function:
        - Captures frames
        - Runs pose detection
        - Detects curls
        - Streams frames as MJPEG
        """
        global curl_count, curl_position

        while cap.isOpened():
            success, frame = cap.read()
            if not success:
                break

            # Mirror the frame for natural interaction
            frame = cv2.flip(frame, 1)

            # Convert BGR (OpenCV) → RGB (MediaPipe)
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Run pose detection
            results = pose.process(rgb_frame)

            if results.pose_landmarks:
                # Extract landmarks
                landmarks = results.pose_landmarks.landmark

                # Get LEFT arm keypoints (you can extend to right arm later)
                shoulder = [
                    landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y
                ]
                elbow = [
                    landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y
                ]
                wrist = [
                    landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y
                ]

                # Calculate elbow angle
                angle = calculate_angle(shoulder, elbow, wrist)

                # -------------------------
                # CURL DETECTION LOGIC
                # -------------------------

                # Arm fully bent → "up"
                if angle < 50 and curl_position == "down":
                    curl_position = "up"

                # Arm fully extended → "down" (counts 1 rep)
                elif angle > 140 and curl_position == "up":
                    curl_position = "down"
                    curl_count += 1

                # Draw pose skeleton on frame
                mp_drawing.draw_landmarks(
                    frame,
                    results.pose_landmarks,
                    mp_pose.POSE_CONNECTIONS
                )

            # Encode frame as JPEG
            _, buffer = cv2.imencode('.jpg', frame)

            # Stream frame in multipart format (MJPEG)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' +
                   buffer.tobytes() +
                   b'\r\n')

    # Return streaming response
    return Response(
        generate_frames(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )


@app.route("/stop", methods=["GET"])
def stop_camera():
    """
    Stop webcam and release resources.
    """
    global cap
    if cap is not None:
        cap.release()
        cv2.destroyAllWindows()

    return jsonify({"message": "Camera stopped"}), 200


@app.route("/count", methods=["GET"])
def get_curl_count():
    """
    Return current curl count.
    """
    return jsonify({"curl_count": curl_count})


# Run Flask server
if __name__ == "__main__":
    app.run(port=5003, debug=True)
