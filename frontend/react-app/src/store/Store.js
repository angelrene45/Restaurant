import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
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
} from 'redux-persist';

import { categorieSlice } from './slices/categories';
import { dashInfoSlice } from './slices/dashInfo';
import { authSlice } from './slices/auth';
import { foodsApi, foodSlice } from './slices/food'
import { categoriesApi } from './slices/categories';
import { customersApi } from './slices/customers';
import { usersApi } from './slices/users';
import { cartSlice } from './slices/cart';
import { ordersApi } from './slices/orders';
import { settingsApi } from './slices/settings';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducerAuth = persistReducer(persistConfig, authSlice.reducer)
const persistedReducerCart = persistReducer(persistConfig, cartSlice.reducer)

export const store = configureStore({
    reducer: {
        // slices with redux sync state
        foods: foodSlice.reducer,
        dashInfo: dashInfoSlice.reducer,
        categorie: categorieSlice.reducer,

        // Persist Reducers (keep data when user refresh web browser)
        auth: persistedReducerAuth,
        cart: persistedReducerCart,

        // RTK Query reducer (Api Backend)
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [foodsApi.reducerPath]: foodsApi.reducer,
        [customersApi.reducerPath]: customersApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [settingsApi.reducerPath]: settingsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(
            categoriesApi.middleware, 
            foodsApi.middleware, 
            customersApi.middleware, 
            usersApi.middleware,
            ordersApi.middleware,
            settingsApi.middleware)
})

export const persistor = persistStore(store)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)