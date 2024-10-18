import Header from "./components/Header"
import { Outlet } from "react-router-dom"
const App = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto">
  
      <Outlet />
      </div>
    </>
  )
}

export default App