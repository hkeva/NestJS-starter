import { createSlice } from "@reduxjs/toolkit"

export interface UserState {
  isLoggedIn: boolean
}

const initialState: UserState = {
  isLoggedIn: false,
}

export const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    userLogIn: (state) => {
      state.isLoggedIn = true
    },
    userLogout: (state) => {
      localStorage.clear()
      state.isLoggedIn = false
    },
  },
})

export const { userLogIn, userLogout } = userStateSlice.actions

export default userStateSlice.reducer
