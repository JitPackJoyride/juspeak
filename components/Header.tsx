export default function Header() {
  return (
    <header className="bg-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <h3 className="text-2xl font-medium text-orange-500 hover:text-orange-900">
              Juspeak
            </h3>
          </a>
        </div>

        <div className="flex items-center justify-end md:flex-1 lg:w-0">
          <a
            href="#"
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Sign in
          </a>
          <a
            href="#"
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}
