import { TextInput } from "../../components/textInput"
import { useUserLoginMutation } from "../../redux/user/userService"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { userLogIn } from "../../redux/userState/userStateSlice"
import "./index.scss"

export interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const dispatch = useDispatch()
  const [loginError, setLoginError] = useState<any>()
  const [userInfo, setUserInfo] = useState({ email: "", password: "" })
  const [userLogin, { data, isSuccess, isLoading, isError, error }] =
    useUserLoginMutation()

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("auth", data.access_token)
      dispatch(userLogIn())
    }
  }, [isSuccess])

  useEffect(() => {
    if (error && "data" in error) {
      setLoginError(error?.data)
    }
  }, [error])

  return (
    <div className="login">
      <TextInput
        title="Email"
        isRequired
        placeholder="Enter email"
        setValue={(val: string) => {
          setUserInfo({ ...userInfo, email: val })
        }}
      />
      <TextInput
        title="Password"
        isRequired
        isPasswordType
        placeholder="Enter password"
        setValue={(val: string) => {
          setUserInfo({ ...userInfo, password: val })
        }}
      />
      <br />
      <button
        type="submit"
        onClick={() => {
          userLogin(userInfo)
        }}
      >
        Submit
      </button>
      <br /> <br />
      <div style={{ color: "red" }}>{loginError && loginError.message}</div>
    </div>
  )
}
