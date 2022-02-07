import Link from "next/link";

export default function HeroCard() {
  return (
    <div className="relative mb-16">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1528977695568-bd5e5069eb61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1auto=format&fit=crop&w=2830&q=80&sat=-100"
              alt="Group of men sitting during sunset"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">Have the conversations</span>
              <span className="block text-white">that make life better</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
              Strengthen your mental strength and resilience with an online
              training program designed specifically for men.
            </p>
            <div className="mx-auto mt-8 flex max-w-sm justify-center sm:max-w-none">
              <Link href="#get-started">
                <button className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 sm:px-8">
                  Get started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
