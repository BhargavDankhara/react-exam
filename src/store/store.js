import { configureStore } from "@reduxjs/toolkit"
import racipeReducer from "./racipeSlice"

const store = configureStore({
    reducer: racipeReducer,
})

export default store
