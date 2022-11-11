// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { customFetchBaseQuery } from '../../customBaseQuery'

// Define a service using a base URL and expected endpoints
export const foodsApi = createApi({
    reducerPath: 'foodsApi',
    baseQuery: customFetchBaseQuery,
    endpoints: (builder) => ({
      getFoodsByTerm: builder.query({
        query: ({term, page=0}) => `/foods/open/search/${term}?skip=${page*100}&limit=100`,
      }),
    
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useLazyGetFoodsByTermQuery } = foodsApi