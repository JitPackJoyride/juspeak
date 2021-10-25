import { NavigationProps, SocialProps } from "./footer";

const navigation: NavigationProps = {
  support: [
    { name: "Quizzes", href: "#" },
    { name: "Resources", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

const socials: SocialProps = [];

export default function Footer() {
  return (
    <footer className="bg-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-8">
          <div className="grid gap-8 grid-cols-2">
            {Object.entries(navigation).map(
              ([navigationCategory, navigationLinks]) => {
                return (
                  <div key={navigationCategory}>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                      {navigationCategory.toUpperCase()}
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {navigationLinks.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="text-base text-gray-300 hover:text-white"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
            )}
          </div>
          <div className="mt-8 md:mt-0 md:col-span-2 justify-self-end">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-base text-gray-300">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-orange-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between space-y-8 md:space-y-0">
          {socials.length > 0 && (
            <div className="flex space-x-6 md:order-2">
              {socials.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
          <p className="text-base text-gray-400 md:order-1">
            &copy; 2021 Juspeak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
