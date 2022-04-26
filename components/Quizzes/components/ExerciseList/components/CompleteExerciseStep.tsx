import { CheckIcon } from "@heroicons/react/solid";
import { IExercise } from "utils/mdx";
import ExerciseStepText from "components/Quizzes/components/ExerciseList/components/ExerciseStepText";

interface Props {
  exercise: IExercise;
  isNotLastExerciseStep: boolean;
}

export default function CompleteExerciseStep({
  exercise,
  isNotLastExerciseStep,
}: Props) {
  return (
    <>
      {/* The lines between the steps */}
      {isNotLastExerciseStep ? (
        <div
          className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-orange-600"
          aria-hidden="true"
        />
      ) : null}
      {/* The exercise link, if it's a completed exercise */}
      <a
        href={`/exercises/${exercise.slug}`}
        className="group relative flex h-9 items-start"
      >
        {/* The round checkbox with a check mark */}
        <span className="flex h-9 items-center">
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 group-hover:bg-orange-800">
            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
        </span>
        <ExerciseStepText
          title={exercise.frontmatter.title}
          description={exercise.frontmatter.description}
        />
      </a>
    </>
  );
}
