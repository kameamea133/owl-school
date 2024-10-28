import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from "./components/ui/container";
const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container>
  
      <Outlet />
      </Container>
    </>
  )
}

export default App