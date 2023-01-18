import { useEffect, useState } from "react"
import { TextInput } from "../../components/textInput"
import { useUserRegisterMutation } from "../../redux/user/userService"
import "./index.scss"

export interface RegistrationProps {}

export const Registration: React.FC<RegistrationProps> = ({}) => {
  const [userRegister, { data, isSuccess, isLoading, isError, error }] =
    useUserRegisterMutation()
  const [response, setResponse] = useState<any>()
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    data && setResponse(data)
  }, [data])

  return (
    <div className="registration">
      <TextInput
        title="First name"
        isRequired
        placeholder="Enter first name"
        setValue={(val: string) => {
          setUserInfo({ ...userInfo, firstName: val })
        }}
      />
      <TextInput
        title="Last name"
        isRequired
        placeholder="Enter last name"
        setValue={(val: string) => {
          setUserInfo({ ...userInfo, lastName: val })
        }}
      />
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
      <TextInput
        title="Confirm Password"
        isRequired
        isPasswordType
        placeholder="Enter confirm password"
        setValue={(val: string) => {
          setUserInfo({ ...userInfo, confirmPassword: val })
        }}
      />
      <br />
      <button
        onClick={() => {
          userRegister(userInfo)
        }}
      >
        Register
      </button>
      <br />
      <br />
      <div>{response && response.message}</div>
      <br />
      <br />
    </div>
  )
}
