import { atom, selector } from "recoil";
import { IExercises } from "utils/mdx";

export const exerciseState = atom<IExercises>({
  key: "exerciseState",
  default: [],
});

export const numberOfExercisesValue = selector({
  key: "numberOfExercises",
  get: ({ get }) => get(exerciseState).length,
});
