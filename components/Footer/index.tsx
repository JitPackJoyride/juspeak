import { NavigationProps, SocialProps } from "./footer";
import Link from "next/link";

const navigation: NavigationProps = {
  support: [
    { title: "Quizzes", href: "/#get-started" },
    { title: "Resources", href: "resources" },
  ],
  company: [{ title: "About", href: "/#about-us" }],
};

const socials: SocialProps = [];

export default function Footer() {
  return (
    <footer className=" bg-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-8">
          <div className="grid grid-cols-2 gap-8">
            {Object.entries(navigation).map(
              ([navigationCategory, navigationLinks]) => {
                return (
                  <div key={navigationCategory}>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                      {navigationCategory.toUpperCase()}
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {navigationLinks.map((item) => (
                        <li key={item.title}>
                          <Link href={item.href} passHref>
                            <button className="text-base text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              {item.title}
                            </button>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
            )}
          </div>
          {/*<div className="mt-8 justify-self-end md:col-span-2 md:mt-0">*/}
          {/*  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">*/}
          {/*    Join the program*/}
          {/*  </h3>*/}
          {/*  <p className="mt-4 text-base text-gray-300">*/}
          {/*    Reminders to practice new exercises during the course of the*/}
          {/*    program daily.*/}
          {/*  </p>*/}
          {/*  <form className="mt-4 sm:flex sm:max-w-md">*/}
          {/*    <label htmlFor="email-address" className="sr-only">*/}
          {/*      Email address*/}
          {/*    </label>*/}
          {/*    <input*/}
          {/*      type="email"*/}
          {/*      name="email-address"*/}
          {/*      id="email-address"*/}
          {/*      autoComplete="email"*/}
          {/*      required*/}
          {/*      className="w-full min-w-0 appearance-none rounded-md border border-transparent bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"*/}
          {/*      placeholder="Enter your email"*/}
          {/*    />*/}
          {/*    <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">*/}
          {/*      <button*/}
          {/*        type="submit"*/}
          {/*        className="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"*/}
          {/*      >*/}
          {/*        Remind me daily*/}
          {/*      </button>*/}
          {/*    </div>*/}
          {/*  </form>*/}
          {/*</div>*/}
        </div>
        <div className="mt-8 space-y-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between md:space-y-0">
          {socials.length > 0 && (
            <div className="flex space-x-6 md:order-2">
              {socials.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <span className="sr-only">{item.title}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
          <p className="text-base text-gray-400 md:order-1">
            &copy; 2022 Juspeak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
