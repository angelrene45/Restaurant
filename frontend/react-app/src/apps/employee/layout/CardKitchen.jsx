import React from 'react'

export const CardKitchen = ({ orders = [] }) => {
    return (
        <section className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-5 px-5">
            {/* Card order */}
            {orders.map((order, i) =>
                <div key={order.id} className="bg-purple-400 rounded flex-none w-[250px] h-[58vh] xl:h-[65vh] snap-always snap-center">
                   
                    {/* Card */}
                    <div className="flex flex-col h-full p-2">
                        {/* Header Card */}
                        <div className="">
                            <h1>{order.updated_date}</h1>
                        </div>

                        {/* Body Card */}
                        <div className="">
                            {order.foods.map((food, i) =>
                                <span key={`${food.id}-${i}`}>{food.quantity}-{food.name}-{food.variant}</span>
                            )
                            }
                        </div>

                        {/* Footer Card */}
                        <div className="mt-auto">
                            <button
                                type="button"
                                className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                            >
                                Start Order
                            </button>
                        </div>
                    </div>

                </div>
            )
            }

        </section>
    )
}
