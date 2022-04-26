import { IExercise } from "utils/mdx";
import { numberOfExercisesValue } from "stores/exerciseStore";
import { useRecoilValue } from "recoil";
import { classNames } from "utils/tailwind";
import CompleteExerciseStep from "components/Quizzes/components/ExerciseList/components/CompleteExerciseStep";
import CurrentExerciseStep from "components/Quizzes/components/ExerciseList/components/CurrentExerciseStep";
import FutureExerciseStep from "components/Quizzes/components/ExerciseList/components/FutureExerciseStep";

interface Props {
  exercise: IExercise;
}

export default function ExerciseListItem({ exercise }: Props) {
  const numberOfExercises = useRecoilValue(numberOfExercisesValue);
  const isNotLastExerciseStep =
    exercise.frontmatter.exerciseNo !== numberOfExercises;

  return (
    <li
      key={exercise.frontmatter.title}
      className={classNames(isNotLastExerciseStep ? "pb-10" : "", "relative")}
    >
      {exercise.state === "complete" ? (
        <CompleteExerciseStep
          exercise={exercise}
          isNotLastExerciseStep={isNotLastExerciseStep}
        />
      ) : exercise.state === "current" ? (
        <CurrentExerciseStep
          exercise={exercise}
          isNotLastExerciseStep={isNotLastExerciseStep}
        />
      ) : (
        <FutureExerciseStep
          exercise={exercise}
          isNotLastExerciseStep={isNotLastExerciseStep}
        />
      )}
    </li>
  );
}
