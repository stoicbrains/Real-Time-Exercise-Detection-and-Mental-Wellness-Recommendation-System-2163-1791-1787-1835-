import { ExerciseComponent } from "../../component/ExerciseComponent";

export default function CurlPage() {
  const curlVd = "https://drive.google.com/file/d/17MYrrHpCYQWyBE6aJ-DTyeS7R2QEBvEo/preview";
  return (
    <ExerciseComponent
      exerciseName="Bicep Curl"
      points={1}
      videoUrl={curlVd}
    />
  );
}
