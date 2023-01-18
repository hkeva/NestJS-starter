import { ChangeEvent, useEffect, useState } from "react"
import "./index.scss"

export interface TextInputProps {
  title: string
  prefix?: string
  suffix?: string
  placeholder: string
  value?: string
  isPasswordType?: boolean
  setValue?: (val: string) => void
  errorMessage?: string
  className?: string
  isRequired?: boolean
}

export const TextInput: React.FC<TextInputProps> = ({
  title,
  prefix,
  suffix,
  placeholder,
  value,
  isPasswordType,
  setValue,
  errorMessage,
  className,
  isRequired,
}) => {
  //   const [inputValue, setInputValue] = useState(value)

  //   useEffect(() => {
  //     setInputValue(value)
  //   }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value)
  }

  return (
    <div className={`textInput ${className}`}>
      <div className="textInput__title">
        {title} {isRequired && <span className="textInput__asterisk">*</span>}
      </div>
      <input
        type={isPasswordType ? "password" : "text"}
        placeholder={placeholder}
        className="textInput__input"
        // value={inputValue}
        onChange={handleChange}
      ></input>
    </div>
  )
}
