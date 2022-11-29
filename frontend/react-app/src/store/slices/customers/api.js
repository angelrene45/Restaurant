// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { customFetchBaseQuery } from '../../customBaseQuery'

// Define a service using a base URL and expected endpoints
export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: customFetchBaseQuery,
    endpoints: (builder) => ({
      createCustomerOpen: builder.mutation({
        query: (newCustomer) => ({
         url: `/customers/open`,
         method: 'post',
         body: newCustomer
        }),
      }),
      getCustomersBeingAdmin: builder.query({
        query: ({page=0}) => `/customers/?skip=${page*100}&limit=100`,
      }),
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useCreateCustomerOpenMutation } = customerApi