import { ExerciseComponent } from "../../component/ExerciseComponent";

export default function PressPage() {
  const pushupVd = "https://drive.google.com/file/d/19GeQUqf6tOicu6e6Tt-XnIRmnzRfFnSj/preview";
  return (
    <ExerciseComponent
      exerciseName="Press"
      points={3}
      videoUrl={pushupVd}
    />
  );
}
