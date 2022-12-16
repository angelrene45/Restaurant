import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment';

import { useGetOrdersByIdQuery } from '../../../store/slices/orders';
import { OrderItems } from '../layout/OrderItems';

const statusColor = (status) => {
    switch (status) {

      case 'cancel':
        return 'font-medium rounded-full text-center px-2.5 py-0.5 bg-red-100 text-emerald-600';
      case 'failed':
        return 'font-medium rounded-full text-center px-2.5 py-0.5 bg-red-100 text-emerald-600';
      default:
        return 'font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 text-slate-500';
    }
};


export const OrderDetailPage = () => {

    const { order_id } = useParams();
    const { data = {}, isFetching, isError, isSuccess } = useGetOrdersByIdQuery(order_id);

    const {
        id,
        foods,
        address,
        order_type,
        status,
        created_date,
        subtotal,
        tax,
        discount,
        grant_total,
    } = data;


    return (
        <div className="max-w-3xl m-auto mt-8">
            <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                    {/* Page header */}
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">

                        {/* Left: Title */}
                        <div className="mb-4 sm:mb-0">
                            <span className="text-2xl md:text-3xl text-slate-800 font-bold mr-2">
                                Order n.º {id}
                            </span>
                            
                            <span className={statusColor(status)}>
                                {status}
                            </span>
                            
                            <div className="mt-2">
                                <span className="text-2sm md:text-3sm text-slate-800">{moment(created_date).format('LLLL')} </span>
                            </div>

                        </div>

                        {/* Right: Actions */}
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                            {/* Add Edit Order button */}
                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                </svg>
                                <span className="ml-2">Edit Order</span>
                            </button>

                        </div>

                    </div>

                    {/* Details order */}
                    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        <div>
                            <div>
                                <span className="text-slate-800 font-bold">Address Shipment</span>
                            </div>
                            {address}
                        </div>
                        <div>
                            <div>
                                <span className="text-slate-800 font-bold">Order Type</span>
                            </div>
                            {order_type}
                        </div>
                        <div>
                            <div>
                                <span className="text-slate-800 font-bold">Resume</span>
                            </div>
                            <div>
                                <li className="flex items-center justify-between">
                                    <div className="text-base">Subtotal</div>
                                    <div className="text-base font-medium text-slate-800 ml-2">${subtotal}</div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="text-base">Taxes</div>
                                    <div className="text-base font-medium text-slate-800 ml-2">${tax}</div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="text-base mr-2">Discount</span>
                                    </div>
                                    <div className="text-base font-medium text-slate-800 ml-2">-${discount}</div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="text-base">Total</div>
                                    <div className="text-base font-medium text-emerald-600 ml-2">${grant_total}</div>
                                </li>
                            </div>
                        </div>
                    </div>

                    {/* Foods */}
                    <div className="border-t border-slate-200">
                        <div className="max-w-3xl m-auto mt-8">
                            <article className="pt-6">
                                <div className="xl:flex">
                                    <div className="w-32 shrink-0">
                                        <h2 className="text-xl leading-snug font-bold text-slate-800 xl:leading-7 mb-4 xl:mb-0">Foods</h2>
                                    </div>
                                    <div className="grow pb-6 border-b border-slate-200">
                                        {/* List */}
                                        {isSuccess && <OrderItems items={foods} readMode={true} />}
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>

                </div>
            </main>
        </div>

    )
}
