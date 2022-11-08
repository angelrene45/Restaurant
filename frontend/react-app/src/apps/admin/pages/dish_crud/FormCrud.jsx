import React, { useState, useRef } from "react";
import { backendApi } from "../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getCategories } from "../../../../store/slices/categories";
import { createFood, getFood } from "../../../../store/slices/food";

function FormCrud(props) {
  const dispatch = useDispatch();
  const [variants, setVariants] = useState([]);
  const [units, setUnits] = useState([]);
  const [categoriesObject, setcategoriesObject] = useState([]);
  const [idVariants, setIdVariants] = useState(1);
  const [idUnits, setIdUnits] = useState(1);
  const [toggle1, setToggle1] = useState(true);
  const [foodState, setFoodState] = useState({});
  const { id } = useParams();

  const { categories } = useSelector((state) => state.categorie);
  const food = useSelector((state) => state.foods.food);

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const discountInputRef = useRef();

  useEffect(() => {
    dispatch(getCategories());

    const getFoodFunc = async () => {
      const { data, status, statusText, headers } = await backendApi.get(`/foods/open/${id}`);
      setFoodState(data);
      setUnits(data.units);
      setVariants(data.variants)
      setIdUnits(data.units.length)
      setIdVariants(data.variants.length) 
    }
    
    if (id) {
      dispatch(getFood(id));
      getFoodFunc().catch((e) => console.log(e))
    }
  }, []);


  const selectInputHandle = (e) => {
    setcategoriesObject([]);
    const htmlToArray = Array.prototype.slice.call(e.target.selectedOptions);
    const categoriesEntered = htmlToArray.map((categorie) => ({
      id: categorie.id,
    }));
    setcategoriesObject(categoriesEntered);
  };

  const addVariantHandle = () => {
    setIdVariants(idVariants + 1);
    setVariants([
      ...variants,
      {
        id: 'variant' + idVariants,
      },
    ]);
  };

  const addUnitHandle = () => {
    setIdUnits(idUnits + 1);
    setUnits([
      ...units,
      {
        id: idUnits,
      },
    ]);
  };

  const deleteVariantstHandle = (id) => {
    setVariants((current) => current.filter((variant) => variant.id || variant.name !== id));
  };

  const deleteUnitstHandle = (id) => {
    setUnits((current) => current.filter((unit) => unit.id || unit.unit !== id));
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDiscount = discountInputRef.current.value;
    const enteredToggle = toggle1;
    const enteredUnits = [];
    const enteredVariants = [];
    const formData = new FormData();

    const collectionUnits = Array.prototype.slice.call(
      document.getElementsByClassName("inputUnit")
    );
    const collectionPrice = Array.prototype.slice.call(
      document.getElementsByClassName("inputPrice")
    );

    for (let i = 0; i < collectionPrice.length; i++) {
      enteredUnits.push({
        unit: collectionUnits[i].value,
        price: Number(collectionPrice[i].value),
      });
    }

    const collectionName = Array.prototype.slice.call(
      document.getElementsByClassName("inputName")
    );
    const collectionFile = Array.prototype.slice.call(
      document.getElementsByClassName("inputFile")
    );

    for (let i = 0; i < collectionName.length; i++) {
      let fileValue = collectionFile[i].value;
      let startIndex =
        fileValue.indexOf("\\") >= 0
          ? fileValue.lastIndexOf("\\")
          : fileValue.lastIndexOf("/");
      let filename = fileValue.substring(startIndex);
      if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
        filename = filename.substring(1);
      }
      enteredVariants.push({
        name: collectionName[i].value,
        image: filename,
      });
    }

    let food_in = JSON.stringify({
      name: enteredName,
      description: enteredDescription,
      variants: enteredVariants,
      units: enteredUnits,
      categories: categoriesObject,
      discount: enteredDiscount,
      is_active: enteredToggle === "on" ? true : false,
    });

    formData.append("food_in", food_in);

    collectionFile.forEach((element) => {
      formData.append(`files`, element.files[0]);
    });
    if (id) {
      dispatch(createFood(formData));
    } else {
      dispatch(createFood(formData));
    }
  };

  return (
    <form className="flex flex-col " onSubmit={submitHandle}>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
          {id ? "Update" : "Create"} Food ✨
          </h1>
        </div>

        <div className="border-t border-slate-200">
          <div className="space-y-8 mt-8">
            <div>
              <div className="grid gap-5 md:grid-cols-3">
                {/* Input name */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="default"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className="form-input w-full"
                    type="text"
                    ref={nameInputRef}
                    defaultValue={foodState.name}
                  />
                </div>
                {/* Input description */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="default"
                  >
                    Description
                  </label>
                  <input
                    id="default"
                    className="form-input w-full"
                    type="text"
                    ref={descriptionInputRef}
                    defaultValue={foodState.description}
                  />
                </div>
                {/* Input discount */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="suffix"
                  >
                    Discount
                  </label>
                  <div className="relative">
                    <input
                      id="suffix"
                      className="form-input w-full pr-8"
                      type="number"
                      ref={discountInputRef}
                      defaultValue={foodState.discount}
                    />
                    <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                      <span className="text-sm text-slate-400 font-medium px-3">
                        %
                      </span>
                    </div>
                  </div>
                </div>

                {/* Select categorie */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="country"
                  >
                    Categorie
                  </label>
                  <select
                    id="categorie"
                    multiple
                    className="form-select"
                    onChange={(event) => {
                      selectInputHandle(event);
                    }}
                  >
                    {categories.map((categorie) => (
                      <option
                        value={categorie.id}
                        id={categorie.id}
                        key={categorie.id}
                      >
                        {categorie.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Is active */}
                <div className="flex flex-col">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="country"
                  >
                    Is active
                  </label>
                  <div className="form-switch">
                    <input
                      type="checkbox"
                      id="switch-1"
                      className="sr-only"
                      checked={toggle1}
                      onChange={() => setToggle1(!toggle1)}
                    />
                    <label className="bg-slate-400" htmlFor="switch-1">
                      <span
                        className="bg-white shadow-sm"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Switch label</span>
                    </label>
                  </div>
                  <div className="text-sm text-slate-400 italic ml-2">
                    {toggle1 ? "True" : "false"}
                  </div>
                </div>
                {/* Select units */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="country"
                  >
                    Units
                  </label>
                  {units.map((unit) => (
                    <div key={unit.id || unit.unit}>
                      <div className="flex mt-2">
                        <input
                          id="name"
                          className="form-input w-full mr-2 inputUnit"
                          type="text"
                          placeholder="Unit"
                          defaultValue={unit.unit}
                        />
                        <input
                          id="name"
                          className="form-input w-full mr-2 inputPrice"
                          type="number"
                          placeholder="Price"
                          defaultValue={unit.price}
                        />

                        <button
                          className="btn border-slate-200 hover:border-slate-300 text-rose-500"
                          onClick={() => deleteUnitstHandle(unit.id || unit.unit)}
                        >
                          <svg
                            className="w-4 h-4 fill-current shrink-0"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"></path>
                          </svg>
                          <span className="ml-2">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="btn  bg-indigo-500 hover:bg-indigo-600 text-white mt-3"
                    onClick={() => addUnitHandle()}
                    type="button"
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                    </svg>
                    <span className="ml-2">Add unit</span>
                  </button>
                </div>
                {/* Select variants */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="country"
                  >
                    Variants
                  </label>
                  {variants.map((variant) => (
                    <div key={variant.name || variant.id}>
                      <label className="block">
                        <span className="sr-only">Choose photo</span>
                        <input
                          type="file"
                          className="block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-violet-50 file:text-violet-700
                          hover:file:bg-violet-100
                          inputFile
                          "
                        />
                        <div className="flex">
                          <input
                            className="form-input w-full px-2 py-1 mt-2 inputName mr-2"
                            type="text"
                          />
                          <button
                            className="btn border-slate-200 hover:border-slate-300 text-rose-500"
                            onClick={() => deleteVariantstHandle(variant.id || variant.name)}
                          >
                            <svg
                              className="w-4 h-4 fill-current shrink-0"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"></path>
                            </svg>
                            <span className="ml-2">Delete</span>
                          </button>
                        </div>
                      </label>
                    </div>
                  ))}

                  <button
                    className="btn  bg-indigo-500 hover:bg-indigo-600 text-white mt-3"
                    onClick={() => addVariantHandle()}
                    type="button"
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                    </svg>
                    <span className="ml-2">Add variant</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 mt-3">
          <div className="col-end-7 col-span-1 flex flex-row-reverse">
            <button
              className="btn-lg bg-emerald-500 hover:bg-emerald-600 text-white -order-1"
              type="submit"
            >
              {id ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormCrud;
