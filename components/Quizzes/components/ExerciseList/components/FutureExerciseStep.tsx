import { IExercise } from "utils/mdx";
import ExerciseStepText from "components/Quizzes/components/ExerciseList/components/ExerciseStepText";

interface Props {
  exercise: IExercise;
  isNotLastExerciseStep: boolean;
}

export default function FutureExerciseStep({
  exercise,
  isNotLastExerciseStep,
}: Props) {
  return (
    <>
      {/* The lines between the steps */}
      {isNotLastExerciseStep ? (
        <div
          className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
          aria-hidden="true"
        />
      ) : null}
      {/* The exercise link, if it's a future exercise */}
      <a
        href={`/exercises/${exercise.slug}`}
        className="group relative flex h-9 items-start"
      >
        {/* The unchecked round checkbox */}
        <span className="flex h-9 items-center" aria-hidden="true">
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
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
