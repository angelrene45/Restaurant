import { useRef } from "react";

const CategoriesCRUD = () => {
    const categorieInputRef = useRef();

    const createCategorieHandler = async (event) => {
        event.preventDefault();
        const enteredCategorie = categorieInputRef.current.value;
        if (enteredCategorie) {
            let token = localStorage.getItem('TOKEN')
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            var raw = JSON.stringify({
            "name": enteredCategorie
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            try {
                const response = await fetch("http://localhost:8000/api/v1/categories/", requestOptions);
                if (response.ok) {
                    const data = await response.json()    
                    MySwal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Categorie created',
                        showConfirmButton: false,
                        timer: 1500
                      })
                } else {
        
                  throw new Error("Invalid credentials")
                }
                
              } catch(e) {
                //mostrar error
                window.alert(e)
              }
        };
    };


    return (
        <>
            <div  style={{ height:'80%', width: '80%'}}>
                <form onSubmit={createCategorieHandler}>
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <h1>Create category</h1>
                            <div className="grid grid-cols-6 gap-6 mt-3">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Categorie name</label>
                                    <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" ref={categorieInputRef} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CategoriesCRUD;