import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import { Homepage } from "./modules/homepage"
import { Login } from "./modules/login"
import { Registration } from "./modules/registration"
import { Layout } from "./modules/layout"
import NotFound from "./modules/notFound"
import { RootState } from "./redux/store"
import Protected from "./protectedRoute"
import UserProfile from "./modules/profile"
import Public from "./publicRoute"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { userLogIn } from "./redux/userState/userStateSlice"

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(
    (state: RootState) => state.userState.isLoggedIn
  )

  useEffect(() => {
    localStorage.getItem("auth") && dispatch(userLogIn())
  }, [localStorage.getItem("auth")])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="login"
            element={
              <Public isLoggedIn={isLoggedIn}>
                <Login />
              </Public>
            }
          />
          <Route
            path="registration"
            element={
              <Public isLoggedIn={isLoggedIn}>
                <Registration />
              </Public>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/profile"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <UserProfile />
              </Protected>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
