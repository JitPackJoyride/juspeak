import { useRecoilState, useRecoilValue } from "recoil";
import { descriptionComponent } from "stores/quizStore";
import Link from "next/link";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { userState } from "stores/dbStore";

export default function Quizzes() {
  const renderComponent = useRecoilValue(descriptionComponent);
  const [{ userProfile }, setUser] = useRecoilState(userState);

  return (
    <div id={"get-started"}>
      <ArrowDownIcon className={"mx-auto h-9 w-9 text-orange-500"} />
      {!userProfile ? (
        <div
          className={
            "mx-auto flex min-h-[650px] max-w-7xl flex-col justify-center py-16 px-4 sm:px-6 md:items-center lg:px-8"
          }
        >
          <h2 className="mt-2 text-2xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-3xl">
            The Juspeak Program
          </h2>
          <p className="mt-4 text-lg text-gray-500 lg:mx-auto lg:max-w-7xl lg:text-center">
            You need to be logged in first.
          </p>
          <Link href={"/login"} passHref>
            <button className="my-8 rounded-md border border-transparent bg-orange-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white sm:px-8 lg:mx-auto lg:max-w-sm">
              Login
            </button>
          </Link>
        </div>
      ) : (
        renderComponent
      )}
    </div>
  );
}
