import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./slices/messagesSlice";


export const store = configureStore({
    reducer: {
        messages: counterSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store