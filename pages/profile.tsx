import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "stores/dbStore";
import { supabase } from "utils/supabaseClient";
import { definitions } from "types/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import SingleActionModal, { ModalProps } from "components/SingleActionModal";
import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { useRouter } from "next/router";
import AvatarUpload from "components/Profile/components/AvatarUpload";
import { profileState } from "stores/profileStore";
import ChangeUsername from "components/Profile/components/ChangeUsername";

const Profile: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<ModalProps | null>(null);
  const router = useRouter();

  const [profile, setProfile] = useRecoilState(profileState);
  const [{ userProfile }, setUser] = useRecoilState(userState);

  useEffect(() => {
    setProfile((prevProfile) => {
      return { ...prevProfile, username: userProfile?.username };
    });
  }, [setProfile, userProfile]);

  useEffect(() => {
    supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (_event == "SIGNED_OUT") {
          router.replace("/login");
        }
      }
    );
  }, []);

  async function updateProfile({
    username,
    avatarUrl,
    usableUrl,
  }: {
    id?: string;
    username?: string;
    avatarUrl?: string;
    usableUrl?: string;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      let { data, error } = await supabase
        .from<definitions["profiles"]>("profiles")
        .upsert(updates, { returning: "representation" });

      if (error) {
        throw error;
      }

      if (data) {
        const updatedData = data[0];
        setUser((prevUser) => {
          return {
            ...prevUser,
            userProfile: {
              ...prevUser.userProfile,
              username: updatedData.username,
              avatarUrl: updatedData.avatar_url
                ? usableUrl
                : `https://ui-avatars.com/api/?name=${username}&color=fff&background=f97316&bold=true`,
            },
          };
        });
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {message ? <SingleActionModal {...message} /> : <></>}
      <div className="mx-auto my-8 flex min-h-max max-w-7xl flex-col space-y-8 divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your profile information.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <ChangeUsername />
              <AvatarUpload
                onUpload={(storageUrl, usableUrl) => {
                  updateProfile({ avatarUrl: storageUrl, usableUrl });
                }}
              />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() =>
                updateProfile({
                  username: profile.username,
                  usableUrl: userProfile?.avatarUrl,
                })
              }
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
        <button
          className="mb-2 w-fit self-center rounded-md bg-gray-500 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white"
          onClick={() => {
            supabase.auth.signOut();
            setUser({ userProfile: undefined });
          }}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Profile;
