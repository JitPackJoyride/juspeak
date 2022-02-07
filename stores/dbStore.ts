import { atom } from "recoil";
import { Session } from "@supabase/gotrue-js";

export const databaseState = atom<Session | null>({
  key: "databaseState",
  default: null,
});

export interface IUser {
  userProfile?: { id?: string; username?: string; avatarUrl?: string };
}

export const userState = atom<IUser>({
  key: "userState",
  default: {},
});
