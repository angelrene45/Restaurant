
import { 
    useGetCategoriesQuery,
    useGetCategoriesCountQuery, 
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
} from "../../../../store/slices/categories";

import { CrudPage } from "../../layout/CrudPage";
import { CategoryModal } from "./CategoryModal";

// columns names that shows on list table 
const skipColumns = ["id"]

export const CategoryPage = () => {

    return (
        <CrudPage
            nameSingular="Category"
            namePlural="Categories"
            skipColumns={skipColumns}
            ModalComponent={CategoryModal}
            useGetAllQuery={(...args) => useGetCategoriesQuery(...args)}
            useGetCountAllQuery={(...args) => useGetCategoriesCountQuery(...args)}
            useCreateMutation={(...args) => useCreateCategoryMutation(...args)}
            useUpdateMutation={(...args) => useUpdateCategoryMutation(...args)}
        />
    )
}

