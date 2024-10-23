'use client'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer  from './slice/AuthSlice'
import userReducer  from './slice/UserSlice'
import modalReducer  from './slice/ModalSlice'
import fetchReducer  from './slice/FetchSlice'
import cartReducer  from './slice/CartSlice'


const persistConfig = {
    key: "root",
    storage,
};  

// const rootReducer = combineReducers({
//     auth: persistedReducer,
//     user: userReducer,
//     modal: modalReducer,
//     fetch: fetchReducer,
//     cart: cartReducer,
//   });

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        user: userReducer,
        modal: modalReducer,
        fetch: fetchReducer,
        cart: cartReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
                }
            })
})

export const persistor = persistStore(store)