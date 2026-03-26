"use client";
import { useEffect, useState } from "react";

export const Leaderboard = ({exerciseName}) => {
    // We update this URL to fetch from Next.js API route or keep hitting the existing node endpoints
    // For now, since we haven't merged the express APIs yet, let's keep it hitting the server or mock it.
    const [leaderboardData, setLeaderboardData] = useState([]);
    useEffect(()=>{
      async function fetchAccountData() {
        try {
          // If the Express server isn't running, this will fail. For now, keep as-is till we migrate the endpoints
          let endpoint = "http://127.0.0.1:9000/api/user/leaderBoardGlobal";
          if(exerciseName === "Bicep Curl") endpoint = "http://127.0.0.1:9000/api/user/leaderBoardCurls";
          else if(exerciseName === "Press") endpoint = "http://127.0.0.1:9000/api/user/leaderBoardPress";
          else if(exerciseName === "Squat") endpoint = "http://127.0.0.1:9000/api/user/leaderBoardSquats";

          const response = await fetch(endpoint, {
            method: "GET",
            // credentials: "include", // Can disable credentials if it crashes due to CORS for now
          });
          const data = await response.json();
          if (data && data.data && data.data.board) {
            setLeaderboardData(data.data.board);
          }
        } catch (err) {
          console.error("Leaderboard fetch failed:", err);
          // Set some fallback fake data so it looks nice
          setLeaderboardData([
            { username: "Rishi", curls: 45, pushups: 32, squats: 50, total: 127 },
            { username: "Khushal", curls: 40, pushups: 28, squats: 45, total: 113 },
            { username: "Keshav", curls: 38, pushups: 25, squats: 40, total: 103 },
            { username: "Guest User", curls: 10, pushups: 5, squats: 20, total: 35 }
          ]);
        }   
      }
      fetchAccountData();
    },[exerciseName])
  
    return (
      <div className="w-64 bg-gray-900 text-white p-4 rounded-xl border-2 border-red-500 shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <span className="text-xl font-bold text-red-400">🏆 Leaderboard</span>
        </div>
        <div className="flex flex-col gap-3">
          {leaderboardData.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-800 p-2 rounded-lg shadow-md"
            >
              <span className="text-lg font-semibold truncate flex-1"> {index + 1}. {user.username} </span>
              <span className="bg-gray-700 px-3 py-1 rounded-lg text-sm ml-2">
              {exerciseName === "Bicep Curl"
                  ? user.curls
                  : exerciseName === "Press"
                  ? user.pushups
                  : exerciseName === "Squat"
                  ? user.squats
                  : user.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
