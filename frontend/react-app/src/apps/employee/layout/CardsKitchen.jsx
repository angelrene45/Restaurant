import React from 'react'

import { CardsKitchenItem } from './CardsKitchenItem';
import { StatusOrder } from '../../../utils';


export const CardsKitchen = ({ orders = [], tabName = '', drinksTab = false, drinkCategories = [] }) => {
    // store the filtered orders list
    let filteredOrder = []

    // status that display on kitchen Tab
    const statusAllowedKitchen = [StatusOrder.new, StatusOrder.preparing]

    // filter order by status
    switch (tabName) {
        case 'Kitchen':
            filteredOrder = orders.filter(order => statusAllowedKitchen.includes(order.status))
            break;
        case 'Drinks':
            filteredOrder = orders.filter(order => statusAllowedKitchen.includes(order.status))
            break;
        case 'History':
            filteredOrder = orders.filter(order => !statusAllowedKitchen.includes(order.status)).reverse()
            break;
    }

    return (
        <section className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-5 px-5">
            {/* Card order */}
            {filteredOrder.length > 0 ?
                filteredOrder.map((order) =>
                    <CardsKitchenItem key={order.id} order={order} tabName={tabName} drinksTab={drinksTab} drinkCategories={drinkCategories} />
                )
                :
                <div className="h-[58vh] xl:h-[65vh]">
                    <span className='text-xl italic font-medium'>
                        No orders found
                    </span>
                </div>
            }
        </section>
    )
}
