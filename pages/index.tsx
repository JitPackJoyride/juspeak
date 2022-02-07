import type { NextPage } from "next";
import { InferGetStaticPropsType } from "next";
import HeroCard from "../components/HeroCard";
import AboutUs from "../components/AboutUs";
import Quizzes from "../components/Quizzes";
import DisclaimerContent from "../components/DisclaimerContent";
import { getAllExercises, IExercises } from "utils/mdx";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { exerciseState } from "stores/exerciseStore";
import { supabase } from "utils/supabaseClient";
import { definitions } from "types/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { quizState, TypeformEmbedId } from "stores/quizStore";
import SingleActionModal, { ModalProps } from "components/SingleActionModal";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialExercises,
}) => {
  const [message, setMessage] = useState<ModalProps | null>(null);
  const setQuizState = useSetRecoilState(quizState);
  const [data, setData] = useState<definitions["exercises"][] | null>(null);
  const [exercises, setExercises] = useRecoilState(exerciseState);
  useEffect(() => {
    setExercises(initialExercises);
  }, [initialExercises, setExercises]);

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

          if (data && data?.length > 0) {
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
  }, []);

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
  }, [data]);

  useEffect(() => {
    async function getQuizzes() {
      try {
        const user = supabase.auth.user();
        if (user) {
          const { data, error, status } = await supabase
            .from<definitions["quizzes"]>("quizzes")
            .select(`id, completed`)
            .single();

          if (error && status !== 406) {
            throw error;
          }

          if (data) {
            setQuizState({
              id: data.id,
              // @ts-ignore
              completed: new Set(
                data.completed?.map(
                  (completedQuiz) =>
                    Object.entries(TypeformEmbedId).find(
                      ([key, val]) => val === completedQuiz
                    )?.[1]
                )
              ),
            });
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

    getQuizzes();
  }, []);

  return (
    <div>
      {message ? <SingleActionModal {...message} /> : <></>}
      <HeroCard />
      <DisclaimerContent />
      <AboutUs />
      <Quizzes />
    </div>
  );
};

export const getStaticProps = async () => {
  const exercises = getAllExercises();

  return {
    props: { initialExercises: exercises },
  };
};

export default Home;
