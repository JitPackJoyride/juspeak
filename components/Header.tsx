import Link from "next/link";
import { useRecoilState } from "recoil";
import { databaseState, userState } from "stores/dbStore";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";
import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import Avatar from "components/Avatar";
import { definitions } from "../types/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import SingleActionModal, { ModalProps } from "components/SingleActionModal";

export default function Header() {
  const [session, setSession] = useRecoilState(databaseState);
  const [message, setMessage] = useState<ModalProps | null>(null);
  const [{ userProfile }, setUser] = useRecoilState(userState);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        getProfile();
      }
    );
  }, [setSession, setUser]);

  useEffect(() => {
    getProfile();
  }, [setUser]);

  async function getProfile() {
    try {
      const user = supabase.auth.user();

      if (user) {
        let { data, error, status } = await supabase
          .from<definitions["profiles"]>("profiles")
          .select(`username, avatar_url`)
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          let url: string | undefined = undefined;
          if (data.avatar_url) {
            url = await downloadImage(data?.avatar_url);
          }
          setUser((prevUser) => {
            return {
              ...prevUser,
              userProfile: {
                id: data?.id,
                username: data?.username,
                avatarUrl:
                  url ||
                  `https://ui-avatars.com/api/?name=${data?.username}&color=fff&background=f97316&bold=true`,
              },
            };
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

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error || data == null) {
        throw error;
      }
      return URL.createObjectURL(data);
    } catch (error) {
      if (error instanceof Error) {
        const description = `Error downloading image: ${error.message}`;
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
  }

  return (
    <header className="bg-white">
      {message ? <SingleActionModal {...message} /> : <></>}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/" passHref>
            <button
              className={
                "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white"
              }
            >
              <h3 className="text-2xl font-medium text-orange-500 hover:text-orange-600">
                Juspeak
              </h3>
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-end gap-3 md:flex-1 lg:w-0">
          {!userProfile ? (
            <Link href="/login" passHref>
              <button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white">
                Login
              </button>
            </Link>
          ) : (
            <Link href={"/profile"} passHref>
              <a
                className={
                  "flex items-center justify-end gap-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white"
                }
              >
                <Avatar />
                <p>{userProfile?.username}</p>
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
