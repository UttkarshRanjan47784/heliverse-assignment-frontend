import {configureStore} from "@reduxjs/toolkit";
import ListReducer from "./ListSlice.jsx"

export const store = configureStore({
    reducer : ListReducer
})