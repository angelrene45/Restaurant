// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { customFetchBaseQuery } from '../../customBaseQuery'
import { getEnvVariables } from '../../../utils'

const { MAX_RECORDS_PAGE } = getEnvVariables()

// Define a service using a base URL and expected endpoints
export const customersApi = createApi({
    reducerPath: 'customersApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ["Customers", "CustomersCount"],

    endpoints: (builder) => ({
      getCustomers: builder.query({
        query: ({page=0}) => `/customers/?skip=${page*MAX_RECORDS_PAGE}&limit=${MAX_RECORDS_PAGE}`,
        providesTags: ["Customers"]
      }),
      getCustomersCount: builder.query({
        query: () => `/customers/count`,
        providesTags: ["CustomersCount"]
      }),
      createCustomer: builder.mutation({
        query: (newCustomer) => ({
          url: `/customers/`,
          method: 'post',
          body: newCustomer
        }),
        invalidatesTags: ["Customers", "CustomersCount"]
      }),
      updateCustomer: builder.mutation({
        query: (updateCustomer) => ({
          url: `/customers/${updateCustomer.id}`,
          method: 'put',
          body: updateCustomer
        }),
        invalidatesTags: ["Customers"]
      }),
      createCustomerOpen: builder.mutation({
        query: (newCustomer) => ({
         url: `/customers/open`,
         method: 'post',
         body: newCustomer
        }),
      }),
      
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { 
    useGetCustomersQuery,
    useGetCustomersCountQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useCreateCustomerOpenMutation
  } = customersApi