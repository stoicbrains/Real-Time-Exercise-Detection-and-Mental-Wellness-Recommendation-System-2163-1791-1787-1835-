"use client";
import { useState, useEffect } from "react";
import { WebcamFeed } from "./WebcamFeed";
import { Leaderboard } from "./Leaderboard";

const getServerPort = (exerciseName) => {
  const exercisePorts = {
    "Bicep Curl": 5003,
    "Press": 5001,
    "Squat": 5002,
  };
  return exercisePorts[exerciseName] || 5003;
};

export const ExerciseComponent = ({ exerciseName, points, videoUrl }) => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [repCount, setRepCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const serverPort = getServerPort(exerciseName);

  useEffect(() => {
    if (isWebcamActive) {
      const interval = setInterval(() => {
        fetch(`http://localhost:${serverPort}/count`)
          .then((res) => res.json())
          .then((data) => {
            let newCount = data.rep_count || data.curl_count || data.press_count || data.squat_count || 0;
            if (newCount !== prevCount) {
              setRepCount(newCount);
              setPrevCount(newCount);
            }
          })
          .catch((err) => console.error("Fetch Error:", err));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isWebcamActive, serverPort, prevCount]);

  const handleStart = () => {
    setIsWebcamActive(true);
    setRepCount(0);
    setPrevCount(0);
  };

  const handleStop = () => {
    fetch(`http://localhost:${serverPort}/stop`).then(() => {
      setIsWebcamActive(false);
      setTotalPoints((prev) => prev + repCount * points);
    }).catch(err => {
      console.error("Stop error, fallback:", err);
      setIsWebcamActive(false);
      setTotalPoints((prev) => prev + repCount * points);
    });
  };

  const isGoogleDriveVideo = videoUrl?.includes("drive.google.com");
  const driveEmbedUrl = isGoogleDriveVideo
    ? videoUrl.replace("/view?usp=sharing", "/preview")
    : videoUrl;

  return (
    <div className="flex-grow w-full bg-black min-h-[calc(100vh-64px)] flex items-center justify-center gap-8 p-4 relative pt-20">
      <div className="absolute top-24 right-8 bg-gray-800 text-white px-6 py-3 rounded-lg text-xl font-semibold shadow-md border border-gray-700">
        Points Earned: <span className="text-green-400">{totalPoints}</span>
      </div>
      <div className="w-[65%] max-w-3xl h-[500px] bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-gray-700 shadow-2xl">
        {isWebcamActive ? (
          <WebcamFeed exerciseName={exerciseName} serverPort={serverPort} />
        ) : (
          <>
            {isGoogleDriveVideo ? (
              <iframe
                src={driveEmbedUrl}
                className="w-full h-full rounded-lg"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            ) : (
              <video src={videoUrl} controls className="w-full h-full rounded-lg object-cover" />
            )}
          </>
        )}
      </div>
      <div className="flex flex-col items-center gap-6">
        <Leaderboard exerciseName={exerciseName} />
        {!isWebcamActive ? (
          <button
            className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white px-6 py-3 rounded-lg text-xl font-bold shadow-lg shadow-red-500/30"
            onClick={handleStart}
          >
            START
          </button>
        ) : (
          <button
            className="w-full bg-gray-600 hover:bg-gray-700 transition-colors text-white px-6 py-3 rounded-lg text-xl font-bold mt-2 shadow-lg"
            onClick={handleStop}
          >
            STOP
          </button>
        )}
      </div>
    </div>
  );
};
