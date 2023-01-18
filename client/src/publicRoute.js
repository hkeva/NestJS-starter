import { Navigate } from "react-router-dom"

const Public = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return <Navigate to="/profile" replace />
  }
  return children
}
export default Public
