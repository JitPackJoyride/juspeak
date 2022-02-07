import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

interface Props {
  prevSlug: string;
  nextSlug: string;
}

export default function NavigateExercises({ prevSlug, nextSlug }: Props) {
  return (
    <nav className="not-prose mt-8 flex w-full items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="group -mt-px flex w-0 flex-1">
        <div className="border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 group-hover:border-orange-500 group-hover:text-orange-500 sm:text-base lg:text-lg xl:text-xl">
          <Link href={`/exercises/${prevSlug}`} prefetch={false} passHref>
            <a
              className={
                "group inline-flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white"
              }
            >
              <ArrowNarrowLeftIcon
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-orange-500"
                aria-hidden="true"
              />
              Previous
            </a>
          </Link>
        </div>
      </div>
      <div className="hidden md:-mt-px md:flex" />
      <div className="group -mt-px flex w-0 flex-1 justify-end">
        <div className="border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 group-hover:border-orange-500 group-hover:text-orange-500 sm:text-base lg:text-lg xl:text-xl">
          <Link href={`/exercises/${nextSlug}`} prefetch={false} passHref>
            <a
              className={
                "group inline-flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white"
              }
            >
              Next
              <ArrowNarrowRightIcon
                className="ml-3 h-5 w-5 text-gray-400 group-hover:text-orange-500"
                aria-hidden="true"
              />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
