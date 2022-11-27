
import { useState } from "react";

import { useGetCategoriesQuery } from "../../../../store/slices/categories";
import { Loading } from "../../../../components/items/Spinner";
import { CategoryAddModal } from "./CategoryAddModal";
import { CategoriesTable } from "./CategoriesTable"
import { CategoryUpdateModal } from "./CategoryUpdateModal";


export const CategoriesPage = () => {

    const { data: categories = [], isFetching, error } = useGetCategoriesQuery()
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [categorySelected, setCategorySelected] = useState({})

    return (
        <>  
            {/* Modal with for data for add or update category */}
            <CategoryAddModal open={openModalAdd} setOpen={setOpenModalAdd} />
            <CategoryUpdateModal open={openModalUpdate} setOpen={setOpenModalUpdate} categorySelected={categorySelected} />

            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                {/* Page header */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">

                    {/* Left: Title */}
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                            Categories
                        </h1>
                    </div>

                    {isFetching && <Loading />}

                    {/* Right: Actions */}
                    <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                        {/* Filter button */}
                        {/* <FilterButton align="right" /> */}

                        {/* Add customer button */}
                        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setOpenModalAdd(true)}>
                            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                            </svg>
                            <span className="hidden xs:block ml-2">Add Category</span>
                        </button>

                    </div>

                </div>

                {/* Table */}
                <CategoriesTable 
                    categories={categories}
                    setOpen={setOpenModalUpdate} 
                    setCategorySelected={setCategorySelected} 
                />
            </div>
        </>
    )
}

