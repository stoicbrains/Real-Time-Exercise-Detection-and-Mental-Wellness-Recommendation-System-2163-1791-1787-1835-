import Link from "next/link";

export default function ExerciseHub() {
  return (
    <div className="bg-black min-h-[calc(100vh-64px)] text-white pt-24 px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
          Physical Wellness
        </h1>
        <p className="text-xl text-gray-400 mb-12 text-center">
          Improve your physical health, earn points, and climb the leaderboard! Choose an exercise below to get started with real-time AI tracking.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { name: "Bicep Curls", path: "curl", points: 1, color: "from-blue-500 to-cyan-500" },
            { name: "Squats", path: "squats", points: 2, color: "from-purple-500 to-pink-500" },
            { name: "Press", path: "press", points: 3, color: "from-orange-500 to-red-500" }
          ].map((ex) => (
            <Link 
              key={ex.name} 
              href={`/exercise/${ex.path}`}
              className={`p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-500 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex flex-col items-center justify-center text-center group`}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${ex.color} flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform`}>
                <span className="text-2xl font-bold">+{ex.points}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{ex.name}</h2>
              <span className="text-gray-500 uppercase tracking-widest text-sm font-semibold">{ex.points} Points / Rep</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
