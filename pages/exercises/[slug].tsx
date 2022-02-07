import { getMDXComponent } from "mdx-bundler/client";
import { getAllExercises, getSingleExercise, IExercises } from "utils/mdx";
import { useEffect, useMemo, useState } from "react";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Rating from "../../components/Exercises/Rating";
import NavigateExercises from "../../components/Exercises/components/NavigateExercises";
import { useRecoilState } from "recoil";
import { exerciseState } from "stores/exerciseStore";
import { ModalProps } from "components/SingleActionModal";
import { starRatingFactory } from "stores/ratingStore";
import { supabase } from "utils/supabaseClient";
import { definitions } from "types/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const Exercise = ({
  code,
  frontmatter,
  allExercises,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [message, setMessage] = useState<ModalProps | null>(null);
  const router = useRouter();
  const [data, setData] = useState<definitions["exercises"][] | undefined>();
  const [exercises, setExercises] = useRecoilState(exerciseState);
  const [exerciseIndex, setExerciseIndex] = useState(
    exercises.findIndex(
      (exercise) => exercise.frontmatter.exerciseNo === frontmatter.exerciseNo
    )
  );

  useEffect(() => {
    setExercises(allExercises);
  }, [allExercises, setExercises]);

  useEffect(() => {
    async function getExercisesFromDb() {
      try {
        const user = supabase.auth.user();
        if (user) {
          const { data, error, status } = await supabase
            .from<definitions["exercises"]>("exercises")
            .select(`id, exercise_number, is_completed`);

          if (error && status !== 406) {
            throw error;
          }

          if (data) {
            setData(data);
          }
        }
      } catch (error) {
        const description = (error as PostgrestError).message;

        setMessage({
          modalType: "error",
          title: "Error",
          description,
          buttonText: "Try again",
          onSubmit: () => {
            setMessage(null);
          },
        });
      }
    }

    getExercisesFromDb();
  }, [exerciseIndex]);

  useEffect(() => {
    if (data) {
      const allExercises: IExercises = exercises.map((exercise, index) => {
        return {
          // @ts-ignore
          id: data.find((element) => element.exercise_number === index + 1).id,
          // @ts-ignore
          state: data.find((element) => element.exercise_number === index + 1)
            .is_completed
            ? "complete"
            : "upcoming",
          frontmatter: exercise.frontmatter,
          slug: exercise.slug,
        };
      });

      setExercises(() => {
        const firstUpcomingExercise = allExercises.findIndex(
          (element) => element.state === "upcoming"
        );
        if (firstUpcomingExercise === 0) {
          allExercises[0].state = "current";
        } else if (firstUpcomingExercise === -1) {
          // pass
        } else {
          allExercises[firstUpcomingExercise].state = "current";
        }
        return allExercises;
      });
    }
  }, [data, exerciseIndex]);

  const [exerciseIndexes, setExerciseIndexes] = useState({
    prevExerciseIndex: 0,
    nextExerciseIndex: 2,
  });

  useEffect(() => {
    const exerciseIndex = exercises.findIndex(
      (exercise) => exercise.frontmatter.exerciseNo === frontmatter.exerciseNo
    );

    setExerciseIndex(exerciseIndex);

    setExerciseIndexes({
      prevExerciseIndex:
        (((exerciseIndex - 1) % exercises.length) + exercises.length) %
        exercises.length,
      nextExerciseIndex: (exerciseIndex + 1) % exercises.length,
    });
  }, [exercises, frontmatter.exerciseNo]);

  const Component = useMemo(() => getMDXComponent(code), [code]);

  const usefulnessRatingState = starRatingFactory(
    `usefulnessRating${frontmatter.exerciseNo}`
  );
  const difficultyRatingState = starRatingFactory(
    `difficultyRating${frontmatter.exerciseNo}`
  );

  return (
    <div className={"flex flex-col items-center gap-16 pb-16"}>
      <div>
        <p
          className={
            "text-center text-xl font-semibold uppercase tracking-wide text-orange-500"
          }
        >
          Session {frontmatter.exerciseNo}
        </p>
        <h1
          className={
            "mt-2 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          }
        >
          {frontmatter.title}
        </h1>
      </div>
      <div
        className={
          "prose prose-sm mx-auto max-w-4xl sm:prose sm:px-6 lg:prose-lg lg:px-8 xl:prose-xl"
        }
      >
        <img
          src={frontmatter.imgSrc}
          className={
            "h-full w-full object-cover shadow-xl sm:overflow-hidden sm:rounded-2xl"
          }
          alt={frontmatter.imgDescription}
        />
      </div>
      <article
        className={
          "prose prose-sm mx-auto max-w-prose px-4 prose-a:text-orange-500 prose-a:no-underline sm:px-6 lg:prose-lg lg:px-8 xl:prose-xl"
        }
      >
        <Component />
        <Rating
          exerciseIndex={exerciseIndex}
          usefulnessRatingState={usefulnessRatingState}
          difficultyRatingState={difficultyRatingState}
        />

        <NavigateExercises
          prevSlug={exercises[exerciseIndexes.prevExerciseIndex]?.slug}
          nextSlug={exercises[exerciseIndexes.nextExerciseIndex]?.slug}
        />
      </article>
    </div>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = await getSingleExercise(params?.slug as string);
  return {
    props: { ...post, allExercises: getAllExercises() },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllExercises().map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default Exercise;
