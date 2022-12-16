import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getEnvVariables } from '../utils'

const { API_URL } = getEnvVariables()

// custom base query from RTK Query (put baseUrl and put token in all api that use this custom variable)
export const customFetchBaseQuery = fetchBaseQuery({ 
    baseUrl: 'http://127.0.0.1:8000/api/v1/', 
    prepareHeaders: (headers, { getState }) => {
        // get token from loginSlice
        const token = getState().auth.authToken
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})