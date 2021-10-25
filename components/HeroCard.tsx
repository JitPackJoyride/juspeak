export default function HeroCard() {
  return (
    <div className="relative mb-16">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
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
              <span className="block text-white">Take control of your</span>
              <span className="block text-white">mental health</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
              Strengthen your resilience and mental strength with your own
              tailored training program.
            </p>
            <div className="mt-8 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <a
                href="#"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 sm:px-8"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
