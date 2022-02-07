import { useRecoilState } from "recoil";
import { exerciseState } from "stores/exerciseStore";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import ExerciseStep from "./components/ExerciseStep";

export default function Index() {
  const [exercises] = useRecoilState(exerciseState);

  // @ts-ignore
  const currentExercise =
    exercises.find((element) => element.state === "current") ||
    exercises[exercises.length - 1];

  return (
    <div className="min-h-[650px] py-16 px-4 sm:px-6 lg:py-28 lg:px-8">
      <div className="relative max-w-7xl divide-y-2 divide-gray-200 md:mx-auto">
        <div
          className={
            "md:text-center"
            // + "lg:text-left"
          }
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Exploration Completed
          </h2>
          <div
            className={
              `mt-3 sm:mt-4 lg:items-center lg:gap-5`
              // + " lg:grid lg:grid-cols-2"
            }
          >
            <p className="text-xl text-gray-500">
              Congratulations! Continue the program now or be reminded daily to
              practice a new exercise.
            </p>
            {/*<form className="mt-6 flex flex-col sm:flex-row md:justify-center lg:mt-0 lg:justify-end">*/}
            {/*  <div>*/}
            {/*    <label htmlFor="email-address" className="sr-only">*/}
            {/*      Email address*/}
            {/*    </label>*/}
            {/*    <input*/}
            {/*      id="email-address"*/}
            {/*      name="email-address"*/}
            {/*      type="email"*/}
            {/*      autoComplete="email"*/}
            {/*      required*/}
            {/*      className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white"*/}
            {/*      placeholder="Enter your email"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  <div className="mt-2 flex w-full flex-shrink-0 rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:inline-flex sm:w-auto">*/}
            {/*    <button*/}
            {/*      type="button"*/}
            {/*      className="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:inline-flex sm:w-auto"*/}
            {/*    >*/}
            {/*      Remind me daily*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*</form>*/}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4 pt-10 md:flex-row md:items-center">
          <div
            className={
              "w-full flex-1 rounded-lg border border-gray-200 shadow-md md:mx-14 lg:mx-24"
            }
          >
            <div className={"space-y-5 p-6 text-left"}>
              <div className={"space-y-2"}>
                <h3 className={"text-xl font-bold text-gray-900 sm:text-2xl"}>
                  The Juspeak Program
                </h3>
                <p className={"text-base text-gray-500"}>
                  Continue where you left off.
                </p>
              </div>

              <Link href={`/exercises/${currentExercise?.slug}`} passHref>
                <button
                  className={
                    "flex w-full items-center justify-between rounded-md bg-orange-600 py-2 px-4 text-white hover:cursor-pointer hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  }
                >
                  <div className={"text-left"}>
                    <p className={"text-sm font-thin text-white"}>
                      Continue practicing
                    </p>
                    <p className={"text-base font-semibold text-white"}>
                      {currentExercise?.frontmatter.title}
                    </p>
                  </div>
                  <ArrowRightIcon className={"h-5 w-5"} />
                </button>
              </Link>
            </div>
          </div>
          <nav aria-label="Progress" className={"flex-1"}>
            <ol role="list" className="overflow-hidden">
              {exercises.map((exercise, exerciseIndex) => (
                <ExerciseStep exercise={exercise} key={exerciseIndex} />
              ))}
            </ol>
          </nav>
        </div>
      </div>
      {/*<p*/}
      {/*  className={"mt-6 text-lg font-extralight text-gray-500 md:text-center"}*/}
      {/*>*/}
      {/*  Need extra resources?*/}
      {/*  <Link href={"resources"} passHref>*/}
      {/*    <button*/}
      {/*      className={*/}
      {/*        "text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 focus:ring-offset-white"*/}
      {/*      }*/}
      {/*    >*/}
      {/*      Click here*/}
      {/*    </button>*/}
      {/*  </Link>*/}
      {/*</p>*/}
    </div>
  );
}
