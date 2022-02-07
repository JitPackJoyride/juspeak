import { atom, selector } from "recoil";
import Introduction from "../components/Quizzes/components/Introduction";
import QuizCards from "../components/Quizzes/components/QuizCards";
import ExerciseList from "../components/Quizzes/components/ExerciseList";

export enum TypeformEmbedId {
  Introduction = "oDVwcOr3",
  ResilienceTest = "MakKF3Jc",
  ConversationTest = "MvGuh58i",
}

export interface IQuiz {
  id?: string;
  completed: Set<TypeformEmbedId>;
}

export const quizState = atom<IQuiz>({
  key: "quizState",
  default: {
    completed: new Set(),
  },
});

export const descriptionComponent = selector({
  key: "descriptionComponent",
  get: ({ get }) => {
    if (get(quizState).completed.size === 0) return <Introduction />;
    if (get(quizState).completed.size === Object.keys(TypeformEmbedId).length)
      return <ExerciseList />;

    return <QuizCards />;
  },
});
