import { atom } from "recoil";

export interface IProfile {
  username?: string;
}

export const profileState = atom<IProfile>({
  key: "profileState",
  default: {},
});
