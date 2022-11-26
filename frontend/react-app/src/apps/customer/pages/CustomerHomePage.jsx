import { Link } from "react-router-dom";


export const CustomerHomePage = () => {

  return (
    <div className="flex h-screen overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Cards */}
        <div className="grid grid-cols-12 gap-6">

          <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Order in restaurant</h5>
              <p className="mb-3 font-normal">Choose a table in the restaurant and order your food from here.</p>
            </header>
            <div className="px-5 py-3">
              <Link to="/customer/foods" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Go
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </Link>
            </div>
          </div>


          <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Order to pick up or delivery</h5>
              <p className="mb-3 font-normal">Order your food and choose home delivery or pick up the restaurant.</p>
            </header>
            <div className="px-5 py-3">
              <Link to="/customer/foods" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Go
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}