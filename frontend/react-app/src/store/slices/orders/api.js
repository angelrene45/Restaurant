// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { getEnvVariables } from '../../../utils'
import { customFetchBaseQuery } from '../../customBaseQuery'

const { MAX_RECORDS_PAGE } = getEnvVariables()

// Define a service using a base URL and expected endpoints
export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: customFetchBaseQuery,
  tagTypes: ["Orders", "OrdersCount"],

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (page=0) => `/orders/open?skip=${page*MAX_RECORDS_PAGE}&limit=${MAX_RECORDS_PAGE}`,
      providesTags: ["Orders"]
    }),
    getOrdersCount: builder.query({
      query: () => `/orders/count`,
      providesTags: ["OrdersCount"]
    }),
    getOrdersById: builder.query({
      query: (order_id) => `/orders/${order_id}`,
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: `/orders/`,
        method: 'post',
        body: newOrder
      }),
      invalidatesTags: ["Orders", "OrdersCount"]
    }),
    updateOrder: builder.mutation({
      query: (updateOrder) => ({
        url: `/orders/${updateOrder.id}`,
        method: 'put',
        body: updateOrder
      }),
      invalidatesTags: ["Orders"]
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetOrdersQuery,
  useGetOrdersCountQuery,
  useGetOrdersByIdQuery,
  useLazyGetOrdersByIdQuery,
  useCreateOrderMutation, 
  useUpdateOrderMutation
} = ordersApi