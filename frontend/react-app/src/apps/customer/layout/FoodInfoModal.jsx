import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../store/slices/cart'
import { InputCounter } from '../../../components/items/InputCounter'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export const FoodInfoModal = ({open, setOpen, food}) => {

  const {variants, units, categories} = food

  const [category, setCategory] = useState(categories[0].id)
  const [variant, setVariant] = useState(variants[0].name)
  const [image, setImage] = useState(variants[0].image)
  const [unit, setSelectedUnit] = useState(units[0].unit)
  const [price, setPrice] = useState(units[0].price)
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()

  const onVariantChange = (variantName) => {
    // find the variant from variants list by name
    const variantSelected = variants.find(x => x.name === variantName)
    // change the variant that user select
    setVariant(variantSelected.name)
    // change the image if is available 
    if (variantSelected.image) setImage(variantSelected.image)
  }
  
  const onUnitChange = (unitName) => {
    // find the variant from variants list by name
    const unitSelected = units.find(x => x.unit === unitName)
    // change the variant that user select
    setSelectedUnit(unitSelected.unit)
    // change the price from unit selected
    setPrice(unitSelected.price)
  }

  const onClickAddBag = (e) => {
    // avoid refresh page
    e.preventDefault()
    // check quantity is greater than 0
    if (quantity > 0){
      // add order to cart
      dispatch(
        addToCart({
        food_id: food.id, name: food.name, variant: variant, unit: unit, image, price, quantity, description: food.description, category
      }))
      // close modal
      setOpen(false)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-4 h-4 fill-current">
                        <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                    </svg>
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img src={image} alt={food.name} className="object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{food.name}</h2>

                      <section aria-labelledby="information-heading" className="mt-2">
                        <h3 id="information-heading" className="sr-only">
                          food information
                        </h3>
                        <p className="text-2xl text-gray-900">${price}</p>
                      </section>

                      <section aria-labelledby="description-heading" className="mt-2">
                        <h3 id="description-heading" className="sr-only">
                          food description
                        </h3>

                        <p className="text-1xl text-gray-900">{food.description}</p>

                    
                      </section>

                      <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading" className="sr-only">
                          Food options
                        </h3>

                        <form>
                          {/* Variants */}
                          <div className="mt-10">
                            <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">Variant</h4>
                            </div>

                            <RadioGroup value={variant} onChange={onVariantChange} className="mt-4">
                            <RadioGroup.Label className="sr-only"> Choose a variant of food</RadioGroup.Label>
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

                              <RadioGroup value={unit} onChange={onUnitChange} className="mt-4">
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
                          
                          {/* Quantity */}
                          <div className="mt-10">
                              <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">Quantity</h4>
                              </div>
                              <InputCounter quantity={quantity} setQuantity={setQuantity}/>
                          </div>

                          {/* Add to Bag */}
                          <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClickAddBag}
                          >
                            Add to bag
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
