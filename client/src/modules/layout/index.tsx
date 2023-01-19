import { Footer } from "../../components/footer"
import { Navbar } from "../../components/navbar"
import Header from "../header"
import "./index.scss"

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
