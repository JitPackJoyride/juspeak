import { PopupButton } from "@typeform/embed-react";
import { useRecoilState } from "recoil";
import { quizState, TypeformEmbedId } from "stores/quizStore";
import { supabase } from "utils/supabaseClient";
import { definitions } from "types/supabase";
import { useState } from "react";
import SingleActionModal, { ModalProps } from "components/SingleActionModal";
import { PostgrestError } from "@supabase/supabase-js";

export default function Introduction() {
  const [quizzes, setQuizzes] = useRecoilState(quizState);
  const [message, setMessage] = useState<ModalProps | null>(null);
  let completeQuiz = () => {};

  return (
    <div
      className={
        "mx-auto flex min-h-[650px] max-w-7xl flex-col justify-center py-16 px-4 sm:px-6 md:items-center lg:px-8"
      }
    >
      {message ? <SingleActionModal {...message} /> : <></>}
      <h2 className="mt-2 text-2xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-3xl">
        The Juspeak Program
      </h2>
      <p className="mt-4 text-lg text-gray-500 lg:mx-auto lg:max-w-7xl lg:text-center">
        Start with a 3 minute exploration phase to test your current assumptions
        about resilience.
      </p>
      <PopupButton
        id={TypeformEmbedId.Introduction}
        keepSession={true}
        onClose={() => {
          completeQuiz();
        }}
        onSubmit={() => {
          completeQuiz = async () => {
            try {
              const user = supabase.auth.user();
              if (user) {
                const updates = {
                  id: quizzes.id,
                  completed: Array.from(
                    quizzes.completed.add(TypeformEmbedId.Introduction)
                  ),
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  user_id: user.id,
                };

                const { data, error } = await supabase
                  .from<definitions["quizzes"]>("quizzes")
                  .upsert(updates, { returning: "representation" });

                if (error) {
                  throw error;
                }

                setQuizzes((prevQuizState) => ({
                  id: data?.[0].id,
                  completed: prevQuizState.completed.add(
                    TypeformEmbedId.Introduction
                  ),
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
          };
        }}
        enableSandbox={process.env.NODE_ENV !== "production"}
        className="my-8 w-full rounded-md border border-transparent bg-orange-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white sm:px-8 lg:mx-auto lg:max-w-sm"
      >
        Start the Exploration
      </PopupButton>
    </div>
  );
}
