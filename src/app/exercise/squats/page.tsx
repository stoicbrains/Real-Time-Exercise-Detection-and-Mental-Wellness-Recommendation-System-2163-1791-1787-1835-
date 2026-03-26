import { ExerciseComponent } from "../../component/ExerciseComponent";

export default function SquatPage() {
  const squatVd = "https://drive.google.com/file/d/1eO-F6V4_g-E62qJcdXqR-xX0y1Mrtp9M/preview";
  return (
    <ExerciseComponent
      exerciseName="Squat"
      points={2}
      videoUrl={squatVd}
    />
  );
}
