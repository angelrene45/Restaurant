// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { getEnvVariables } from '../../../utils'
import { customFetchBaseQuery } from '../../customBaseQuery'

const { MAX_RECORDS_PAGE } = getEnvVariables()

// Define a service using a base URL and expected endpoints
export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: customFetchBaseQuery,
  tagTypes: ["Categories", "CategoriesCount"],

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (page=0) => `/categories/open?skip=${page*MAX_RECORDS_PAGE}&limit=${MAX_RECORDS_PAGE}`,
      providesTags: ["Categories"]
    }),
    getAllCategories: builder.query({
      query: () => `/categories/open?limit=1000`,
      providesTags: ["Categories"]
    }),
    getCategoriesCount: builder.query({
      query: () => `/categories/count`,
      providesTags: ["CategoriesCount"]
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
      invalidatesTags: ["Categories", "CategoriesCount"]
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
  useGetAllCategoriesQuery,
  useGetCategoriesCountQuery,
  useGetCategoriesWithFoodsQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation
} = categoriesApi