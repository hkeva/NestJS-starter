import { ThreeDots } from "react-loader-spinner"
import "./index.scss"

export default function Spinner() {
  return (
    <div className="spinner">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="gray"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  )
}
