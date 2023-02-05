// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { customFetchBaseQuery } from '../../customBaseQuery'


// Define a service using a base URL and expected endpoints
export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: customFetchBaseQuery,
  tagTypes: ["Settings"],

  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => `/settings/open`,
      providesTags: ["Settings"]
    }),
    getSettingsByName: builder.query({
      query: (name) => `/settings/open/${name}`,
      providesTags: ["Settings"]
    }),
    updateSetting: builder.mutation({
      query: (updateSetting) => ({
        url: `/settings/${updateSetting.name}`,
        method: 'put',
        body: updateSetting
      }),
      invalidatesTags: ["Settings"]
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetSettingsQuery,
  useGetSettingsByNameQuery,
  useUpdateSettingMutation
} = settingsApi