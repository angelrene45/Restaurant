import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../store/slices/auth/authSlice";
import { addAddress } from "../../../store/slices/cart";


export const AddressesCustomer = () => {

    const { userData, userType } = useSelector((state) => state.auth);
    const { addresses = [] } = userData;
    const [selectedAddress, setSelectedAddress] = useState()

    const dispatch = useDispatch();

    const classSelected = "max-w-sm rounded overflow-hidden shadow-lg bg-white border-2 border-sky-500"
    const classUnSelected = "max-w-sm rounded overflow-hidden shadow-lg bg-white"

    // first mount component
    useEffect(() => {
        dispatch(addAddress({ address: '' }))
    }, [])

    // detect new changes on addresses (listen changes on AddressCreateModal Component)
    useEffect(() => {
        // select the last address created by the customer
        if (addresses.length > 0) handleSelectedAddress(addresses.length - 1)
    }, [addresses])


    // on change selected address 
    const handleSelectedAddress = (index) => {
        const currentAddress = addresses[index]
        const stringAddress = Object.values(currentAddress).join(', ')
        dispatch(addAddress({ address: stringAddress }))
        setSelectedAddress(index)
    }

    // remove address only if customer is guest 
    const removeAddress = (indexRemove) => {
        // remove the address from index
        const addressesUpdated = addresses.length === 0 ? [] : addresses.filter((address, index) => indexRemove != index)
        const userDataUpdated = { ...userData, addresses: addressesUpdated }
        // update userData from redux state
        dispatch(setUserData({ userData: userDataUpdated }))
        // clear address from cart slice and avoid problems
        dispatch(addAddress({ address: '' }))
        // select last position
        if (addressesUpdated.length > 0) handleSelectedAddress(addressesUpdated.length - 1)
        // empty address so clear selected
        else setSelectedAddress()
    }

    return (
        <div className="py-4 grid gap-5 md:grid-cols-3 lg:grid-cols-3">
            {addresses.map((address, index) => (
                <div
                    key={index}
                    className={index === selectedAddress ? classSelected : classUnSelected}
                >
                    <div className="px-3 py-2">
                        <div className="border-b border-slate-200">
                            <div className="flex justify-between items-center">
                                <div
                                    onClick={() => handleSelectedAddress(index)}
                                    className="font-semibold text-slate-800">
                                    Address {index + 1}
                                </div>
                                {userType === 'guest' && // show remove button only if user is guest
                                    <button className="text-slate-400 hover:text-slate-500" onClick={() => removeAddress(index)}>
                                        <div className="sr-only">Close</div>
                                        <svg className="w-4 h-4 fill-current">
                                            <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                                        </svg>
                                    </button>
                                }
                            </div>
                        </div>

                        <div onClick={() => handleSelectedAddress(index)}>
                            <div className="text-gray-700 text-base">{address.street}</div>
                            <div className="text-gray-700 text-base">{address.postal_code}</div>
                            <div className="text-gray-700 text-base">{address.city}</div>
                            <div className="text-gray-700 text-base">{address.state}</div>
                            <div className="text-gray-700 text-base">{address.country}</div>

                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}
