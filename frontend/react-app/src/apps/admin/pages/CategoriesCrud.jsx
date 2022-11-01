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
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-10">
            <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                onClick={() => setOpen(false)}
            >
                <span className="sr-only">Close</span>
            </button>

            <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                    <img src={image} alt={product.imageAlt} className="object-cover object-center" />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{name}</h2>

                <section aria-labelledby="information-heading" className="mt-2">
                    <h3 id="information-heading" className="sr-only">
                    Product information
                    </h3>
                    <p className="text-2xl text-gray-900">{price}</p>
                </section>

                <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">
                    Product options
                    </h3>

                    <form>
                    {/* Variants */}
                    <div className="mt-10">
                        <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">Variant</h4>
                        </div>

                        <RadioGroup value={selectedUnit} onChange={setSelectedVariant} className="mt-4">
                        <RadioGroup.Label className="sr-only"> Choose a variant of food </RadioGroup.Label>
                        <div className="grid grid-cols-3 gap-4">
                            {food.variants.map(({name, is_active}) => (
                            <RadioGroup.Option
                                key={name}
                                value={name}
                                disabled={!is_active}
                                className={({ active }) =>
                                classNames(
                                    is_active
                                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                    : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                )
                                }
                            >
                                {({ active, checked }) => (
                                <>
                                    <RadioGroup.Label as="span">{name}</RadioGroup.Label>
                                    {is_active ? (
                                    <span
                                        className={classNames(
                                        active ? 'border' : 'border-2',
                                        checked ? 'border-indigo-500' : 'border-transparent',
                                        'pointer-events-none absolute -inset-px rounded-md'
                                        )}
                                        aria-hidden="true"
                                    />
                                    ) : (
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                    >
                                        <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                        >
                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                        </svg>
                                    </span>
                                    )}
                                </>
                                )}
                            </RadioGroup.Option>
                            ))}
                        </div>
                        </RadioGroup>
                    </div>

                    {/* Sizes */}
                    <div className="mt-10">
                        <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">Unit</h4>
                        </div>

                        <RadioGroup value={selectedUnit} onChange={setSelectedUnit} className="mt-4">
                        <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                        <div className="grid grid-cols-3 gap-4">
                            {food.units.map(({unit, price, is_active}) => (
                            <RadioGroup.Option
                                key={unit}
                                value={unit}
                                disabled={!is_active}
                                className={({ active }) =>
                                classNames(
                                    is_active
                                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                    : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                )
                                }
                            >
                                {({ active, checked }) => (
                                <>
                                    <RadioGroup.Label as="span">{unit}</RadioGroup.Label>
                                    {is_active ? (
                                    <span
                                        className={classNames(
                                        active ? 'border' : 'border-2',
                                        checked ? 'border-indigo-500' : 'border-transparent',
                                        'pointer-events-none absolute -inset-px rounded-md'
                                        )}
                                        aria-hidden="true"
                                    />
                                    ) : (
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                    >
                                        <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                        >
                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                        </svg>
                                    </span>
                                    )}
                                </>
                                )}
                            </RadioGroup.Option>
                            ))}
                        </div>
                        </RadioGroup>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add to order
                    </button>
                    </form>
                </section>
                </div>
            </div>
        </div>
        </>
    );
};

export default CategoriesCRUD;