// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { getEnvVariables } from '../../../utils'
import { customFetchBaseQuery } from '../../customBaseQuery'

const { MAX_RECORDS_PAGE } = getEnvVariables()

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: customFetchBaseQuery,
  tagTypes: ["Users", "UsersCount"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page=0) => `/users/?skip=${page*MAX_RECORDS_PAGE}&limit=${MAX_RECORDS_PAGE}`,
      providesTags: ["Users"]
    }),
    getUsersCount: builder.query({
      query: () => `/users/count`,
      providesTags: ["UsersCount"]
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: `/users/`,
        method: 'post',
        body: newUser
      }),
      invalidatesTags: ["Users", "UsersCount"]
    }),
    updateUser: builder.mutation({
      query: (updateUser) => ({
        url: `/users/${updateUser.id}`,
        method: 'put',
        body: updateUser
      }),
      invalidatesTags: ["Users"]
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetUsersQuery,
  useGetUsersCountQuery,
  useGetUsersWithFoodsQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation
} = usersApi