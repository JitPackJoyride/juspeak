import { IExercise } from "utils/mdx";
import ExerciseStepText from "components/Quizzes/components/ExerciseList/components/ExerciseStepText";

interface Props {
  exercise: IExercise;
  isNotLastExerciseStep: boolean;
}

export default function CurrentExerciseStep({
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
      {/* The exercise link, if it's a current exercise */}
      <a
        href={`/exercises/${exercise.slug}`}
        className="group relative flex h-9 items-start"
        aria-current="step"
      >
        {/* The in-progress round checkbox */}
        <span className="flex h-9 items-center" aria-hidden="true">
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-600 bg-white">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-600" />
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
