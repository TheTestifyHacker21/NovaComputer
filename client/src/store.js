import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/UserSlice';
import PostReducer from './features/ProductSlice';

export const store = configureStore({
    reducer:{
        products:PostReducer,
        users: UserReducer
    }
});