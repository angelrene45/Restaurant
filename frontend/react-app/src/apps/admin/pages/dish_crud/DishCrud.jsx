import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DeleteButton from "../../../../components/items/DeleteButton";
import Table from "./Table";
import PaginationClassic from "../../../../components/items/PaginationClassic";
import FilterButton from "../../../../components/items/DropdownFilter";

const DishCrud = (props) => {
  const dispatch = useDispatch();
  const { page, foods = [], isLoading } = useSelector((state) => state.foods);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(props.getList());
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
            Food ✨
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          <FilterButton align="right" />

          {/* Add customer button */}
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span
              className="hidden xs:block ml-2"
              onClick={() => navigate("/admin/food/create_food")}
            >
              Add Food
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <Table itemsList={foods} delete={props.delete} />
    </div>
  );
};

export default DishCrud;
