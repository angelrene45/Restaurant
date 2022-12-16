
import { useState } from "react";

import { Loading } from "../../../components/items/Spinner";
import { Table } from "./Table"
import { TablePagination } from "./TablePagination";


export const CrudPage = ({
    nameSingular,
    namePlural,
    skipColumns,
    ModalComponent,
    useGetAllQuery,
    useGetCountAllQuery,
    useCreateMutation,
    useUpdateMutation,
}) => {

    // Variables 
    const [openModal, setOpenModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({})
    const [page, setPage] = useState(0)

    // get data by current Page
    const { data: dataPage = [], isFetchingDataPage, errorDataPage } = useGetAllQuery(page)

    // get count of all categories on DB 
    const { data: dataCountDB = [], isFetching: isFetchingCountDB, error: errorCountDB } = useGetCountAllQuery()

    const handleClickAddItem = () => {
        // clear category selected and avoid modal update
        setItemSelected({})
        // open modal
        setOpenModal(true)
    }

    return (
        <>
            {/* Modal with for data for add or update category */}
            <ModalComponent 
                open={openModal} 
                setOpen={setOpenModal} 
                itemSelected={itemSelected}
                useCreateMutation={(...args) => useCreateMutation(...args)}
                useUpdateMutation={(...args) => useUpdateMutation(...args)}
            />

            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                {/* Page header */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">

                    {/* Left: Title */}
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                            {namePlural}
                        </h1>
                    </div>

                    {isFetchingDataPage && <Loading />}

                    {/* Right: Actions */}
                    <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                        {/* Filter button */}
                        {/* <FilterButton align="right" /> */}

                        {/* Add customer button */}
                        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleClickAddItem}>
                            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                            </svg>
                            <span className="hidden xs:block ml-2">Add {nameSingular}</span>
                        </button>

                    </div>

                </div>

                {/* Table */}
                <Table
                    namePlural={namePlural}
                    skipColumns={skipColumns}
                    dataPage={dataPage}
                    dataCountDB={dataCountDB}
                    setOpen={setOpenModal}
                    setItemSelected={setItemSelected}
                />

                {/* Pagination */}
                <div className="mt-8">
                    <TablePagination 
                        dataCountDB={dataCountDB}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            </div>
        </>
    )
}
