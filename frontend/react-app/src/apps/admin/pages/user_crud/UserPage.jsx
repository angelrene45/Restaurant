import { 
    useGetUsersQuery,
    useGetUsersCountQuery, 
    useCreateUserMutation,
    useUpdateUserMutation,
} from "../../../../store/slices/users";

import { CrudPage } from "../../layout/CrudPage";
import { UserModal } from "./UserModal";

// columns names that shows on list table 
const skipColumns = ["id", "mobile"]

export const UserPage = () => {

    return (
        <CrudPage
            nameSingular="User"
            namePlural="Users"
            skipColumns={skipColumns}
            ModalComponent={UserModal}
            useGetAllQuery={(...args) => useGetUsersQuery(...args)}
            useGetCountAllQuery={(...args) => useGetUsersCountQuery(...args)}
            useCreateMutation={(...args) => useCreateUserMutation(...args)}
            useUpdateMutation={(...args) => useUpdateUserMutation(...args)}
        />
    )
}

