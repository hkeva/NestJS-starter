import { useEffect } from "react"
// import { useGetUsersQuery } from "../../redux/user/userService"
import "./index.scss"

export interface HomepageProps {}

export const Homepage: React.FC<HomepageProps> = ({}) => {
  // const { data: userData } = useGetUsersQuery({})

  // useEffect(() => {
  //   // console.log("userData", userData)
  // }, [userData])

  return <div className="homepage">Homepage</div>
}
