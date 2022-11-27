// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { customFetchBaseQuery } from '../../customBaseQuery'

// Define a service using a base URL and expected endpoints
export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: customFetchBaseQuery,
  tagTypes: ["Categories"],

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/categories/open`,
      providesTags: ["Categories"]
    }),
    getCategoriesWithFoods: builder.query({
      query: () => `/categories/foods/open`,
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `/categories/`,
        method: 'post',
        body: newCategory
      }),
      invalidatesTags: ["Categories"]
    }),
    updateCategory: builder.mutation({
      query: (updateCategory) => ({
        url: `/categories/${updateCategory.id}`,
        method: 'put',
        body: updateCategory
      }),
      invalidatesTags: ["Categories"]
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetCategoriesQuery,
  useGetCategoriesWithFoodsQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation
} = categoriesApi