// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { customFetchBaseQuery } from '../../customBaseQuery'

// Define a service using a base URL and expected endpoints
export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: customFetchBaseQuery,
    endpoints: (builder) => ({
      getCategories: builder.query({
        query: () => `/categories/open`,
      }),
      getCategoriesWithFoods: builder.query({
        query: () => `/categories/foods/open`,
      }),
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useGetCategoriesQuery, useGetCategoriesWithFoodsQuery } = categoriesApi