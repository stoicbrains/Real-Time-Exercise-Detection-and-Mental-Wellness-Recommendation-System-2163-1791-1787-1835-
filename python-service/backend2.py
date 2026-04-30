# Import required libraries
from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np
import time

# Check if mediapipe has required modules (version compatibility check)
if not hasattr(mp, "solutions"):
    raise ImportError(
        "MediaPipe is missing mp.solutions (common with mediapipe>=0.10.31). "
        "From the python-service folder run: pip install -r requirements.txt"
    )

# Initialize Flask app and enable CORS (for frontend communication)
app = Flask(__name__)
CORS(app)

# Initialize MediaPipe Pose model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Utility for drawing pose landmarks
mp_drawing = mp.solutions.drawing_utils

# Global variables for camera and push-up tracking
cap = None
press_count = 0          # Total push-ups counted
press_position = "down"  # Current state: "up" or "down"
last_press_time = 0      # Used for cooldown to avoid false counts

def calculate_angle(a, b, c):
    """
    Calculate angle between three points (shoulder, elbow, wrist).
    This helps determine whether arms are bent or straight.
    """
    a, b, c = np.array(a), np.array(b), np.array(c)

    # Compute angle using arctan2 formula
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    # Normalize angle (keep within 0–180 degrees)
    return 360 - angle if angle > 180 else angle


@app.route("/start", methods=["GET"])
def start_camera():
    """
    Start webcam and stream frames with pose detection.
    Also resets push-up count.
    """
    global cap, press_count, press_position, last_press_time

    press_count = 0  # Reset counter
    cap = cv2.VideoCapture(0)  # Start webcam

    # Check if camera opened successfully
    if not cap.isOpened():
        return jsonify({"error": "Could not access webcam"}), 500

    def generate_frames():
        """
        Generator function that continuously captures frames,
        processes pose, counts push-ups, and streams video.
        """
        global press_count, press_position, last_press_time

        while cap.isOpened():
            success, frame = cap.read()
            if not success:
                break

            # Flip frame horizontally for mirror effect
            frame = cv2.flip(frame, 1)

            # Convert BGR (OpenCV) to RGB (MediaPipe)
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Process frame for pose detection
            results = pose.process(rgb_frame)

            if results.pose_landmarks:
                landmarks = results.pose_landmarks.landmark

                # Extract coordinates of important joints
                left_shoulder = [
                    landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y
                ]
                right_shoulder = [
                    landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                    landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y
                ]
                left_elbow = [
                    landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y
                ]
                right_elbow = [
                    landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
                    landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y
                ]
                left_wrist = [
                    landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y
                ]
                right_wrist = [
                    landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,
                    landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y
                ]

                # Calculate elbow angles (key for push-up detection)
                left_angle = calculate_angle(left_shoulder, left_elbow, left_wrist)
                right_angle = calculate_angle(right_shoulder, right_elbow, right_wrist)

                current_time = time.time()

                # Detect downward movement (arms bent)
                if left_angle < 100 and right_angle < 100 and press_position == "up":
                    press_position = "down"

                # Detect upward movement (arms straight → counts as 1 push-up)
                elif left_angle > 160 and right_angle > 160 and press_position == "down":
                    # Apply cooldown to avoid multiple counts per rep
                    if current_time - last_press_time > 0.7:
                        press_position = "up"
                        press_count += 1
                        last_press_time = current_time

                # Draw pose skeleton on frame
                mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

            # Encode frame as JPEG for streaming
            _, buffer = cv2.imencode('.jpg', frame)

            # Yield frame in HTTP multipart format
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

    # Return streaming response
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


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
def get_press_count():
    """
    Return current push-up count.
    """
    return jsonify({"press_count": press_count})


# Run Flask server
if __name__ == "__main__":
    app.run(debug=True, port=5001)
