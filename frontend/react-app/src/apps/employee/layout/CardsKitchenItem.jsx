import React from 'react'
import moment from 'moment';

import { useUpdateOrderMutation } from '../../../store/slices/orders/api';
import { SpinnerButton } from '../../../components/items/Spinner';
import { displayMessage } from '../../../utils/swalMsg';
import { StatusOrder } from '../../../utils';

import { useGetAllCategoriesQuery } from '../../../store/slices/categories/api';

const statusOrder = (status) => {
    switch (status) {
        case StatusOrder.new:
            return 'inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 text-emerald-600';
        case StatusOrder.preparing:
            return 'inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-amber-100 text-amber-600';
        default:
            return 'inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-slate-100 text-slate-500';
    }
};


export const CardsKitchenItem = ({ order = {}, tabName = '', drinksTab, drinkCategories }) => {

    // get categories from database (get id, name and color)
    const { data: categories = [] } = useGetAllCategoriesQuery();

    // value button 
    const valueButton = (
        order.status === StatusOrder.new ? 'Start order' :
            order.status === StatusOrder.preparing ? 'Mark as ready' :
                order.status === StatusOrder.delivering ? 'Return order' :
                    'Mark as ready'
    )

    // mutation for call api (create customer)
    const [updateOrder, { isLoading, error }] = useUpdateOrderMutation();

    // event click 
    const onUpdateOrder = async (order) => {

        // Get foods from order and remove the filter by category

        // Get all foods from order
        let foodsOriginal = Object.values(order.foods).flat();
        // Get foods that filtered on this Card
        let foodsDisplayed = Object.values(filteredFoods).flat();
        // foods displayed change opposite boolean status and foods that doesn't displayed keep the same status 
        let foodsWithStatus = foodsOriginal.map(food => {
            return { ...food, status: foodsDisplayed.find((foodDis) => foodDis.food_id === food.food_id) === undefined ? food.status : !food.status}
        });
        // check if all status in foodsWithStatus are True (that means all food are cooked)
        let statusFoods = foodsWithStatus.every(food => food.status === true);

        // get current status from order
        let { status_foods, status_drinks } = order

        // filter order by status
        switch (tabName) {
            case 'Kitchen':
                if(statusFoods) status_foods = true
                else status_foods = false
                break;
            case 'Drinks':
                if(statusFoods) status_drinks = true
                else status_drinks = false
                break;
        }

        // check if all foods are status in True
        let foods = []
        let status = ''

        //  check current scenario
        switch (order.status) {
            case StatusOrder.new:
                // status when start cook
                foods = foodsWithStatus.map((food) => ({ ...food, status: false }));
                status = StatusOrder.preparing;
                break;
            case StatusOrder.preparing:
                // status when cook is completed
                if(statusFoods) {
                    // all foods are cooked (kitchen and drinks confirm)
                    status = StatusOrder.delivering;
                }else{
                    // partial cooked
                    status = StatusOrder.preparing;
                }
                foods = foodsWithStatus
                break;
            case StatusOrder.delivering:
                // status when rollback in preparing again
                foods = foodsWithStatus.map((food) => ({ ...food, status: false }));
                status = StatusOrder.preparing;
                break;
            default:
                displayMessage("You can't change status in completed orders")
                return;
        }

        // prepare api data
        const apiData = {
            id: order.id,
            foods,
            status,
            status_drinks,
            status_foods
        }

        // call api and await for response
        const { data, error } = await updateOrder(apiData);
        if (error) displayMessage(error?.data?.detail, "error")
    }

    // function to help to filter foods by using drink categories or not 
    const filterFoodsByCategories = (foods, excludeDrinks = false) => {
        // create list that will remove the keys from object
        const keysToRemove = drinkCategories.map(id => String(id));
        // remove foods with drink categories
        const filteredFoods = Object.entries(foods)
            .filter(([key, value]) => excludeDrinks ? !keysToRemove.includes(key) : keysToRemove.includes(key))
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});
        return filteredFoods
    }

    // filter foods if its necessary
    let filteredFoods = order.foods

    // filter data from tab page
    switch (tabName) {
        case 'Kitchen':
            // display order with all categories but exclude drinks
            filteredFoods = filterFoodsByCategories(order.foods, true)
            break;
        case 'Drinks':
            // display order with only drinks categories
            filteredFoods = filterFoodsByCategories(order.foods, false)
            break;
    }

    // check if food are empty
    if (Object.keys(filteredFoods).length === 0) return <></>

    return (
        <div className="shadow-lg rounded-lg border border-slate-200 flex-none w-[280px] h-[58vh] xl:h-[65vh] snap-always snap-center">
            {/* Card */}
            <div className="flex flex-col h-full">
                {/* Header Card */}
                <div className="bg-blue-200 p-2">
                    <div className="">
                        <span className="text-2xl">{moment(order.created_date).format('LT')}</span>
                    </div>
                    <div className="flex text-base pt-2">
                        <div className="w-1/3">{order.order_type}</div>
                        <div className="w-1/3 text-center">#{order.id}</div>
                        <div className="w-1/3 text-center">
                            <span className={statusOrder(order.status)}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Body Card */}
                <div className="overflow-y-auto">
                    {Object.entries(filteredFoods).map(([key, foods]) =>
                        <div key={`${key}`}>
                            <div className={`text-sm uppercase pl-1 ${categories.find(category => category.id == key)?.color}`}>{categories.find((category) => category.id == key)?.name}</div>
                            {foods.map((food, i) =>
                                <div
                                    key={`${food.id}-${i}`}
                                    className={food.status ? "flex pt-2 pb-1 pl-2 items-center opacity-40" : "flex pt-2 pb-1 pl-2 items-center"}
                                >
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
                            <div className='text-xs italic pt-2 pb-1 pl-2'>
                                {order.note}
                            </div>
                        </div>
                    }
                </div>

                {/* Footer Card */}
                <div
                    onClick={() => onUpdateOrder(order)}
                    className="mt-auto">
                    <SpinnerButton
                        classNameEnable="btn w-full bg-green-500 hover:bg-green-600 text-white"
                        classNameDisabled="btn w-full text-white text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        type="button"
                        isLoading={isLoading}
                        value={valueButton}
                    />
                </div>
            </div>

        </div>

    )
}
