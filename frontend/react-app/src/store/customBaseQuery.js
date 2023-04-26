import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getEnvVariables } from '../utils'

const { SERVER_HOST, BACKEND_PORT } = getEnvVariables()

// custom base query from RTK Query (put baseUrl and put token in all api that use this custom variable)
export const customFetchBaseQuery = fetchBaseQuery({ 
    baseUrl: `http://${SERVER_HOST}:${BACKEND_PORT}/api/v1/` , 
    prepareHeaders: (headers, { getState }) => {
        // get token from loginSlice
        const token = getState().auth.authToken
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})