import { 
    useGetCustomersQuery,
    useGetCustomersCountQuery, 
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
} from "../../../../store/slices/customers";

import { CrudPage } from "../../layout/CrudPage";
import { CustomerModal } from "./CustomerModal";

// columns names that shows on list table 
const skipColumns = ["id", "addresses", "mobile"]

export const CustomerPage = () => {

    return (
        <CrudPage
            nameSingular="Customer"
            namePlural="Customers"
            skipColumns={skipColumns}
            ModalComponent={CustomerModal}
            useGetAllQuery={(...args) => useGetCustomersQuery(...args)}
            useGetCountAllQuery={(...args) => useGetCustomersCountQuery(...args)}
            useCreateMutation={(...args) => useCreateCustomerMutation(...args)}
            useUpdateMutation={(...args) => useUpdateCustomerMutation(...args)}
        />
    )
}

