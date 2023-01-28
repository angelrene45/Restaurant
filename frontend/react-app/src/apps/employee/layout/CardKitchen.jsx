import React from 'react'
import moment from 'moment';

const statusOrder = (status) => {
    switch (status) {
        case 'new':
            return 'inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 text-emerald-600';
        case 'preparing':
            return 'inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-amber-100 text-amber-600';
        default:
            return 'inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-slate-100 text-slate-500';
    }
};


export const CardKitchen = ({ orders = [] }) => {
    return (
        <section className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-5 px-5">
            {/* Card order */}
            {orders.map((order, i) =>
                <div key={order.id} className="shadow-lg rounded-lg border border-slate-200 flex-none w-[280px] h-[58vh] xl:h-[65vh] snap-always snap-center">

                    {/* Card */}
                    <div className="flex flex-col h-full">
                        {/* Header Card */}
                        <div className="bg-blue-200 p-2">
                            <div className="">
                                <span className="text-2xl">{moment(order.updated_date).format('LT')}</span>
                            </div>
                            <div className="flex text-base pt-2">
                                <div className="w-1/3">
                                    <span className={statusOrder(order.status)}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="w-1/3 text-center">#{order.id}</div>
                                <div className="w-1/3 text-center">{order.order_type}</div>
                            </div>
                        </div>

                        {/* Body Card */}
                        <div className="overflow-y-auto">
                            {Object.entries(order.foods).map(([key, foods]) =>
                                <div key={`${key}`}>
                                    <div className='bg-gray-200 text-sm uppercase pl-1'>{key}</div>
                                    {foods.map((food, i) =>
                                        <div key={`${food.id}-${i}`} className="flex pt-2 pb-1 pl-2 items-center">
                                            <div className='text-md pr-2'>{food.quantity}</div>
                                            <div className='text-sm'>
                                                {food.name}
                                                <div className='text-xs italic font-semibold'>{food.variant} - {food.unit}</div>
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>
                            )}

                            {/* Customer Note */}

                            {order.note.length > 0 &&
                                <div>

                                    <div className='bg-gray-200 text-sm uppercase pl-1'>
                                        Customer Note
                                    </div>
                                    <div className='text-xs italic pt-2 pb-1 pl-2'>{order.note}</div>
                                </div>

                            }

                        </div>

                        {/* Footer Card */}
                        <div className="mt-auto">
                            <button
                                type="button"
                                className="btn w-full bg-green-500 hover:bg-green-600 text-white"
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
