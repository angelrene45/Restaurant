import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFoods } from "../../../store/slices/food";
import { FoodCart } from "../layout/FoodCart";
import { FoodPagination } from "../layout/FoodPagination";

export const CustomerPage = (props) => {

    const dispatch = useDispatch();
    const {page, foods=[], isLoading} = useSelector(state => state.foods)
    
    useEffect(() => {
      dispatch(getFoods());
    }, [])

    const prevPageListener = () => dispatch(getFoods(page-1));
    const nextPageListener = () => dispatch(getFoods(page+1));

    return (
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar */}
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
  
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
  
          {/*  Site header */}
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
  
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
  
              {/* Page header */}
              <div className="mb-5">
  
                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Find the dishes for you ✨</h1>
  
              </div>
  
              {/* Page content */}
              <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
  
                {/* Sidebar */}
                {/* <ShopSidebar /> */}
  
                {/* Content */}
                <div>
  
                  {/* Filters */}
                  <div className="mb-5">
                    <ul className="flex flex-wrap -m-1">
                      <li className="m-1">
                        <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">View All</button>
                      </li>
                      <li className="m-1">
                        <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">Featured</button>
                      </li>
                    </ul>
                  </div>
  
                  <div className="text-sm text-slate-500 italic mb-4">67.975 Items</div>
  
                  {/* Cards 1 (Video Courses) */}
                  <div>
                    <div className="grid grid-cols-12 gap-6">
                      {
                        foods.map((food) => (
                          <FoodCart key={food.name} food={food}/>
                        ))
                      }
                    </div>
                  </div>
  
                  {/* Pagination */}
                  <div className="mt-6">
                    <FoodPagination
                      events={{prevPageListener, nextPageListener}}
                      page={page}
                      length={foods.length}
                    />
                  </div>
                </div>
  
              </div>
  
            </div>
          </main>
  
        </div>
  
      </div>
    );
};