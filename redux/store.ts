'use client'
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/apiSlice'
import authSlice from './features/auth/authSlice'


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice

    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})



// call the refreshtoken in every page load
// mtlb y k page jb b reload ho ga tu refresh token api hit hogi
// or refresh token and access token renew hojye ga

const initializeApp = async () => {
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));

}

initializeApp();