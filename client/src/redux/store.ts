import { configureStore } from "@reduxjs/toolkit"
import userStateReducer from "./userState/userStateSlice"
import { userApi } from "./user/userService"
import { postApi } from "./post/postService"

export const store = configureStore({
  reducer: {
    userState: userStateReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(postApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
