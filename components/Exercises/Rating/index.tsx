import StarRating from "./components/StarRating";
import { useEffect, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";
import SingleActionModal, { ModalProps } from "components/SingleActionModal";
import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "utils/supabaseClient";
import { definitions } from "types/supabase";
import { v4 as uuidv4 } from "uuid";
import { exerciseState } from "stores/exerciseStore";
import { IStarRating, ratingIdState } from "stores/ratingStore";

interface Props {
  exerciseIndex: number | undefined;
  usefulnessRatingState: RecoilState<IStarRating>;
  difficultyRatingState: RecoilState<IStarRating>;
}

export default function Rating({
  exerciseIndex,
  usefulnessRatingState,
  difficultyRatingState,
}: Props) {
  const [message, setMessage] = useState<ModalProps | null>(null);
  const [usefulnessStarRating, setUsefulnessStarRating] = useRecoilState(
    usefulnessRatingState
  );
  const [difficultyStarRating, setDifficultyStarRating] = useRecoilState(
    difficultyRatingState
  );
  const [comment, setComment] = useState("");
  const [ratingId, setRatingId] = useRecoilState(ratingIdState);
  const [exercises] = useRecoilState(exerciseState);

  useEffect(() => {
    setUsefulnessStarRating({ rating: 0, hoverRating: 0 });
    setDifficultyStarRating({ rating: 0, hoverRating: 0 });
    setComment("");

    async function getRating() {
      try {
        const user = supabase.auth.user();

        // @ts-ignore
        if (user && exercises[exerciseIndex].id) {
          const { data, error } = await supabase
            .from<definitions["ratings"]>("ratings")
            .select(`id, usefulness, difficulty, comment`)
            // @ts-ignore
            .eq("exercise_id", exercises[exerciseIndex].id)
            .single();

          if (error) {
            setRatingId(null);
            setUsefulnessStarRating({ rating: 0, hoverRating: 0 });
            setDifficultyStarRating({ rating: 0, hoverRating: 0 });
            setComment("");
            throw error;
          }

          setRatingId(data ? data.id : null);

          if (data?.usefulness) {
            // @ts-ignore
            setUsefulnessStarRating((prevUsefulnessStarRating) => {
              return {
                ...prevUsefulnessStarRating,
                rating: data.usefulness,
                hoverRating: data.usefulness,
              };
            });
          }
          if (data?.difficulty) {
            // @ts-ignore
            setDifficultyStarRating((prevDifficultyStarRating) => {
              return {
                ...prevDifficultyStarRating,
                rating: data.difficulty,
                hoverRating: data.difficulty,
              };
            });
          }
          setComment(data?.comment || "");
        }
      } catch (error) {}
    }

    getRating();
  }, [exerciseIndex, exercises]);

  async function handleRatingSubmit() {
    try {
      const user = supabase.auth.user();
      if (user) {
        const updates = {
          id: ratingId || uuidv4(),
          // @ts-ignore
          exercise_id: exercises[exerciseIndex].id,
          comment: comment,
          usefulness: usefulnessStarRating.rating,
          difficulty: difficultyStarRating.rating,
        };
        const { data, error } = await supabase
          .from<definitions["ratings"]>("ratings")
          .upsert(updates, { returning: "representation" });

        if (error) {
          console.log(data);
          throw error;
        }

        const newData = data?.[0];

        setRatingId(newData?.id || null);

        if (newData?.usefulness) {
          // @ts-ignore
          setUsefulnessStarRating((prevUsefulnessStarRating) => {
            return {
              ...prevUsefulnessStarRating,
              rating: newData.usefulness,
              hoverRating: newData.usefulness,
            };
          });
        }
        if (newData?.difficulty) {
          // @ts-ignore
          setDifficultyStarRating((prevDifficultyStarRating) => {
            return {
              ...prevDifficultyStarRating,
              rating: newData.difficulty,
              hoverRating: newData.difficulty,
            };
          });
        }
        if (newData?.comment) {
          setComment(newData.comment);
        }

        const { data: dataExercises, error: errorExercises } = await supabase
          .from<definitions["exercises"]>("exercises")
          .upsert(
            {
              // @ts-ignore
              id: exercises[exerciseIndex].id,
              is_completed: true,
              user_id: user.id,
            },
            { returning: "minimal" }
          );

        if (errorExercises) {
          throw errorExercises;
        }
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

  return (
    <>
      <h2>Rating</h2>
      <div>
        {message ? <SingleActionModal {...message} /> : <></>}
        <p
          className={
            "text-sm font-semibold leading-8 text-gray-900 sm:text-base lg:text-lg xl:text-xl"
          }
        >
          How useful would you rate the exercise?
        </p>
        <StarRating
          state={usefulnessRatingState}
          minDescription={"Not useful"}
          maxDescription={"Very useful"}
        />
        <p
          className={
            "text-sm font-semibold leading-8 text-gray-900 sm:text-base lg:text-lg xl:text-xl"
          }
        >
          How difficult would you rate the exercise?
        </p>
        <StarRating
          state={difficultyRatingState}
          minDescription={"Not difficult"}
          maxDescription={"Very difficult"}
        />
        <div className={"mt-6"}>
          <label
            htmlFor="comment"
            className="block text-sm font-semibold leading-8 text-gray-900 sm:text-base lg:text-lg xl:text-xl"
          >
            Add your comment
          </label>
          <div className="mt-6">
            <textarea
              rows={4}
              name="comment"
              id="comment"
              className="lg:text-md block w-full resize-none rounded-md border-gray-300 text-sm shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-base xl:text-lg"
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          handleRatingSubmit();
        }}
        disabled={
          exerciseIndex != null
            ? exerciseIndex < 0
              ? true
              : exercises.length > 0 && exercises[exerciseIndex].id == null
            : true
        }
        className="mt-12 flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:focus:ring-gray-300"
      >
        Submit
      </button>
    </>
  );
}
