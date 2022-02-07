import { quizState, TypeformEmbedId } from "stores/quizStore";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { PopupButton } from "@typeform/embed-react";
import { supabase } from "utils/supabaseClient";
import { definitions } from "types/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import SingleActionModal, { ModalProps } from "components/SingleActionModal";
import { exerciseState } from "stores/exerciseStore";
import { v4 as uuidv4 } from "uuid";

interface Props {
  title: string;
  description: string;
  id: TypeformEmbedId;
  onStart: () => void;
}

export default function QuizCard({ title, description, id, onStart }: Props) {
  const [quizzes, setQuizzes] = useRecoilState(quizState);
  const [exercises, setExercises] = useRecoilState(exerciseState);
  const [message, setMessage] = useState<ModalProps | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(quizzes.completed.has(id));
  }, [id, quizzes]);

  let completeQuiz = () => {};

  async function updateQuizDb() {
    try {
      const user = supabase.auth.user();
      if (user) {
        const updates = {
          id: quizzes.id,
          completed: Array.from(quizzes.completed.add(id)),
          updated_at: new Date().toISOString(),
          user_id: user.id,
        };

        const { data, error } = await supabase
          .from<definitions["quizzes"]>("quizzes")
          .upsert(updates, { returning: "minimal" });

        if (error) {
          throw error;
        }

        setQuizzes((prevQuizState) => ({
          ...prevQuizState,
          completed: prevQuizState.completed.add(id),
        }));
      }
    } catch (error) {
      setMessage({
        modalType: "error",
        title: "Error",
        description: (error as PostgrestError).message,
        buttonText: "Try again",
        onSubmit: () => {
          setMessage(null);
        },
      });
    }
  }

  async function updateExercisesDb() {
    try {
      const user = supabase.auth.user();

      if (user && quizzes.completed.size === 3) {
        const updates = exercises.map((exercise, index) => {
          return {
            id: uuidv4(),
            user_id: user.id,
            exercise_number: index + 1,
            is_completed: exercise.state === "complete",
          };
        });

        const { data, error } = await supabase
          .from<definitions["exercises"]>("exercises")
          .upsert(updates, { returning: "representation" });

        if (error) {
          throw error;
        }

        setExercises((prevExercises) => {
          return prevExercises.map((exercise) => {
            return {
              ...exercise,
              // @ts-ignore
              id: data?.find(
                (element) =>
                  element.exercise_number === exercise.frontmatter.exerciseNo
              ).id,
            };
          });
        });
      }
    } catch (error) {
      setMessage({
        modalType: "error",
        title: "Error",
        description: (error as PostgrestError).message,
        buttonText: "Try again",
        onSubmit: () => {
          setMessage(null);
        },
      });
    }
  }

  const color = isCompleted ? "bg-gray-400" : "bg-orange-600";
  const buttonColor = isCompleted
    ? "bg-gray-500 text-white hover:bg-gray-500 focus:ring-offset-gray-500"
    : "bg-white text-orange-500 hover:bg-gray-200 focus:ring-offset-orange-500";

  return (
    <div
      className={`flex min-h-[16rem] flex-1 flex-col gap-3 overflow-hidden rounded-lg ${color} px-4 py-5 text-white sm:p-6`}
    >
      {message ? <SingleActionModal {...message} /> : <></>}
      <h3 className={"mt-2 text-2xl font-semibold leading-8 sm:text-3xl"}>
        {title}
      </h3>
      <p className={"mb-6 break-words"}>{description}</p>
      <PopupButton
        id={id}
        keepSession={true}
        onClose={() => {
          completeQuiz();
        }}
        onSubmit={() => {
          completeQuiz = async () => {
            await updateQuizDb();
            await updateExercisesDb();
          };
        }}
        enableSandbox={process.env.NODE_ENV !== "production"}
        className={`text-md mt-auto w-full rounded-md border border-transparent py-2 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${buttonColor}`}
      >
        {isCompleted ? "Try again" : "Start"}
      </PopupButton>
    </div>
  );
}
