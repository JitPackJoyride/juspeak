/* This example requires Tailwind CSS v2.0+ */
import { ExclamationIcon } from "@heroicons/react/solid";

export default function DisclaimerContent() {
  return (
    <div className={"mx-auto max-w-7xl sm:px-6 lg:px-8"}>
      <div className="rounded-md bg-orange-100 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationIcon
              className="mt-1 h-5 w-5 text-orange-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-base font-medium text-orange-800">
              This is a prototype to test a concept.
            </h3>
            <div className="mt-2 text-sm text-orange-700">
              <p>
                The application and self-paced programs are rudimentary but
                incorporate a series of tried, tested and popular tools. We
                welcome your feedback during and at the end of the program (
                <a href={"mailto:juspeakhk@gmail.com"}>juspeakhk@gmail.com</a>).
                If you have any concerns about your or anybody else’s mental
                health, you should contact a professional - if you let us know
                we would be happy to connect you with someone appropriate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
