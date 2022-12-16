import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../../components/items/Spinner"
import { useLazyGetOrdersByIdQuery } from "../../../store/slices/orders"
import { displayMessage } from "../../../utils/swalMsg";


export const OrderSearchPage = () => {

    const [getOrderById, { data = {}, isFetching, isError, isSuccess }] = useLazyGetOrdersByIdQuery();

    const navigate = useNavigate();

    if(isError) displayMessage("The order doesn't exists", "warning")

    useEffect(() => {
        if(isSuccess) navigate(`/customer/order/${data.id}`)
    }, [data])
    

    // listen search field 
    const searchHandler = (e) => {
        e.preventDefault()
        // get input value 
        const order_id = e.target[0].value
        e.target[0].value = ""
        if (order_id) getOrderById(order_id, true) // true parameter is for use cache
    }


    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="mb-5">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Find the order</h1>
            </div>

            {/* Search form */}
            <div className="max-w-xl mb-5">
                <form className="relative" onSubmit={searchHandler}>
                    <label htmlFor="app-search" className="sr-only">Search</label>
                    <input id="app-search" className="form-input w-full pl-9 py-3 focus:border-slate-300" type="search" placeholder="Search…" />
                    <button 
                        disabled={isFetching}
                        className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                        <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* Page content */}
            <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
                { isFetching && <Loading/> }
            </div>

        </div>
    )
}
