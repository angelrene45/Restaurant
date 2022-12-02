import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../../store/slices/cart";


export const AddressesCustomer = () => {

    const { userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { addresses = [] } = userData;

    const [selectedAddress, setSelectedAddress] = useState(0)

    const classSelected = "max-w-sm rounded overflow-hidden shadow-lg bg-white border-2 border-sky-500"
    const classUnSelected = "max-w-sm rounded overflow-hidden shadow-lg bg-white"

    // listen when user selected another address and update redux state 
    useEffect(() => {
        if (addresses[selectedAddress] === undefined) return
        const currentAddress = addresses[selectedAddress]
        const stringAddress = Object.values(currentAddress).join(', ')
        dispatch(addAddress({ address: stringAddress }))
    }, [selectedAddress])


    return (
        <div className="py-4 grid gap-5 md:grid-cols-3 lg:grid-cols-3">
            {addresses.map((address, index) => (
                <div
                    onClick={() => setSelectedAddress(index)}
                    key={index}
                    className={index === selectedAddress ? classSelected : classUnSelected}
                >
                    <div className="px-2 py-2">
                        <div className="font-bold text-xl mb-2">Address {index + 1}</div>
                        <div className="text-gray-700 text-base">{address.street}</div>
                        <div className="text-gray-700 text-base">{address.postal_code}</div>
                        <div className="text-gray-700 text-base">{address.city}</div>
                        <div className="text-gray-700 text-base">{address.state}</div>
                        <div className="text-gray-700 text-base">{address.country}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
