import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../redux/store"
import { userLogout } from "../../redux/userState/userStateSlice"
import "./index.scss"

export interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(
    (state: RootState) => state.userState.isLoggedIn
  )

  return (
    <>
      <nav className="navbar">
        <li>
          <Link to="/">Homepage</Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li
              onClick={() => {
                dispatch(userLogout())
              }}
            >
              <Link to="/login">Logout</Link>
            </li>
          </>
        )}
      </nav>
    </>
  )
}
