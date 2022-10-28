import { configureStore } from '@reduxjs/toolkit'

import { foodSlice } from './slices/food'
import { loginSlice } from './slices/login'
import { dashInfoSlice } from './slices/dashInfo/dashSlice'

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        foods: foodSlice.reducer,
        dashInfo: dashInfoSlice.reducer,
    },
})
