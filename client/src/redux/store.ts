import { configureStore } from "@reduxjs/toolkit"
import userStateReducer from "./userState/userStateSlice"
import { userApi } from "./user/userService"

export const store = configureStore({
  reducer: {
    userState: userStateReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
