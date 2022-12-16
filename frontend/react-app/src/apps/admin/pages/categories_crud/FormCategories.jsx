import { useRef } from "react";
import { useParams } from "react-router-dom";

const FormCategories = () => {
  const categorieInputRef = useRef();
  const { id } = useParams();

  const createCategorieHandler = async (event) => {
    event.preventDefault();
    const enteredCategorie = categorieInputRef.current.value;
    if (enteredCategorie) {
      let token = localStorage.getItem("TOKEN");
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      var raw = JSON.stringify({
        name: enteredCategorie,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/categories/",
          requestOptions
        );
        if (response.ok) {
          const data = await response.json();
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Categorie created",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (e) {
        //mostrar error
        window.alert(e);
      }
    }
  };

  return (
    <form className="flex flex-col " onSubmit={createCategorieHandler}>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
            {id ? "Update" : "Create"} Categorie ✨
          </h1>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Categorie name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ref={categorieInputRef}
            />
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
};

export default FormCategories;
