import "./index.scss"

export interface ButtonProps {
  buttonTitle: string
  handleClick: () => void
}

export const Button: React.FC<ButtonProps> = ({ buttonTitle, handleClick }) => {
  return (
    <button onClick={handleClick} className="button">
      {buttonTitle}
    </button>
  )
}
