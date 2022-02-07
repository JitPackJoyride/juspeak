import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";
import SingleActionModal, { ModalProps } from "components/SingleActionModal";
import { AuthChangeEvent, Session } from "@supabase/gotrue-js";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "stores/dbStore";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState<ModalProps | null>(null);
  const [{ userProfile }] = useRecoilState(userState);

  useEffect(() => {
    supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (_event == "SIGNED_IN") {
          router.replace("/#get-started");
        }
      }
    );

    if (userProfile) {
      router.replace("/#get-started");
    }
  }, [userProfile]);

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      setMessage({
        modalType: "success",
        title: "Success",
        description: "Check your email for the login link",
        buttonText: "Ok",
        onSubmit: () => {
          setMessage(null);
        },
      });
    } catch (error) {
      const description =
        // @ts-ignore
        error.error_description || (error as ApiError).message;

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
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        {message ? <SingleActionModal {...message} /> : <></>}

        <div className="space-y-3 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
          <p className="text-center text-base font-light text-gray-900">
            An account will be created if you don&apos;t have one yet
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin(email);
                  }}
                  disabled={loading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:focus:ring-gray-300"
                >
                  {loading ? (
                    <>
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    "Send magic link"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
