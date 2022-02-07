import { atom } from "recoil";

export interface IStarRating {
  rating: number;
  hoverRating: number;
}

export const starRatingFactory = (key: string) =>
  atom<IStarRating>({
    key: key,
    default: { rating: 0, hoverRating: 0 },
  });

interface IExerciseRating {
  usefulRating?: number;
  difficultyRating?: number;
  comments?: string;
}

export type IRatingId = string | null;

export const ratingIdState = atom<IRatingId>({
  key: "ratingIdState",
  default: null,
});

export const exerciseRatingState = atom<IExerciseRating>({
  key: "exerciseRatingState",
  default: {},
});
