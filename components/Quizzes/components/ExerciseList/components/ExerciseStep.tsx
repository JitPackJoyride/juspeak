import { IExercise } from "utils/mdx";
import { CheckIcon } from "@heroicons/react/solid";
import { numberOfExercisesValue } from "stores/exerciseStore";
import { useRecoilValue } from "recoil";

interface Props {
  exercise: IExercise;
}

export default function ExerciseStep({ exercise }: Props) {
  const numberOfExercises = useRecoilValue(numberOfExercisesValue);

  return (
    <li
      key={exercise.frontmatter.title}
      className={classNames(
        exercise.frontmatter.exerciseNo !== numberOfExercises ? "pb-10" : "",
        "relative"
      )}
    >
      {exercise.state === "complete" ? (
        <>
          {exercise.frontmatter.exerciseNo !== numberOfExercises ? (
            <div
              className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-orange-600"
              aria-hidden="true"
            />
          ) : null}
          <a
            href={`/exercises/${exercise.slug}`}
            className="group relative flex items-start"
          >
            <span className="flex h-9 items-center">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 group-hover:bg-orange-800">
                <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
            </span>
            <span className="ml-4 flex min-w-0 flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {exercise.frontmatter.title}
              </span>
              <span className="text-sm text-gray-500">
                {exercise.frontmatter.description}
                Nunquam consumere danista. Homos prarere! Sunt magisteres
                fallere azureus, altus mortemes.
              </span>
            </span>
          </a>
        </>
      ) : exercise.state === "current" ? (
        <>
          {exercise.frontmatter.exerciseNo !== numberOfExercises ? (
            <div
              className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
              aria-hidden="true"
            />
          ) : null}
          <a
            href={`/exercises/${exercise.slug}`}
            className="group relative flex items-start"
            aria-current="step"
          >
            <span className="flex h-9 items-center" aria-hidden="true">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-600 bg-white">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-600" />
              </span>
            </span>
            <span className="ml-4 flex min-w-0 flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {exercise.frontmatter.title}
              </span>
              <span className="text-sm text-gray-500">
                Nunquam consumere danista. Homos prarere! Sunt magisteres
                fallere azureus, altus mortemes.
              </span>
            </span>
          </a>
        </>
      ) : (
        <>
          {exercise.frontmatter.exerciseNo !== numberOfExercises ? (
            <div
              className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
              aria-hidden="true"
            />
          ) : null}
          <a
            href={`/exercises/${exercise.slug}`}
            className="group relative flex items-start"
          >
            <span className="flex h-9 items-center" aria-hidden="true">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
              </span>
            </span>
            <span className="ml-4 flex min-w-0 flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {exercise.frontmatter.title}
              </span>
              <span className="text-sm text-gray-500">
                Nunquam consumere danista. Homos prarere! Sunt magisteres
                fallere azureus, altus mortemes.
              </span>
            </span>
          </a>
        </>
      )}
    </li>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
