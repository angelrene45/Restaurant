import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import { categorieSlice } from './slices/categories'
import { dashInfoSlice } from './slices/dashInfo'
import { loginSlice } from './slices/login'
import { foodSlice } from './slices/food'
import { cartSlice } from './slices/cart'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducerLogin = persistReducer(persistConfig, loginSlice.reducer)
const persistedReducerCart = persistReducer(persistConfig, cartSlice.reducer)

export const store = configureStore({
    reducer: {
        login: persistedReducerLogin,
        foods: foodSlice.reducer,
        dashInfo: dashInfoSlice.reducer,
        categorie: categorieSlice.reducer,
        cart: persistedReducerCart

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})

export const persistor = persistStore(store)