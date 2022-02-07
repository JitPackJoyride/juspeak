/* This example requires Tailwind CSS v2.0+ */
import {
  CalendarIcon,
  LightningBoltIcon,
  UserAddIcon,
} from "@heroicons/react/outline";

const features = [
  {
    title: "Digestible & Practical Exercises",
    description:
      "The simplified exercises emphasize application in real life, building your skills to deal with what's going on in your life.",
    icon: LightningBoltIcon,
  },
  {
    title: "Complete program at your own pace",
    description:
      "Complete the exercises at a pace be your most resilient self.",
    icon: CalendarIcon,
  },

  {
    title: "Self-care for you and your loved ones",
    description:
      "Strengthen your resilience, and become an ambassador for better mental health for men.",
    icon: UserAddIcon,
  },
];

export default function AboutUs() {
  return (
    <div id={"about-us"} className="bg-white pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:items-center md:text-center">
          <h2 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            How does Juspeak work?
          </h2>
          <p className="mt-4 text-xl text-gray-500 lg:mx-auto lg:max-w-3xl">
            Juspeak helps you raise awareness of your thoughts and reactions,
            and guides you to have the right conversations to build mental
            strength and resilience.
          </p>
        </div>

        <div className="bg-white py-12">
          <div className="max-w-xl md:mx-auto md:text-center lg:max-w-7xl lg:px-8">
            <dl className="space-y-10 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              {features.map((feature) => (
                <div key={feature.title}>
                  <dt className={"flex flex-col md:items-center"}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-600 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-lg font-medium leading-6 text-gray-900">
                      {feature.title}
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
