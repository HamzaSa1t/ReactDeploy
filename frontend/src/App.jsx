import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Home from "./pages/home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Cart from "./pages/cart"
import Logout from "./components/logout"
import Profit from "./pages/profit"
import Charge from "./pages/charge"
import Dashboard from "./pages/dashboard"
import History from "./pages/history"
import AddProduct from "./components/AddProduct"
/* function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
} */

function RegisterAndLogout() {
  localStorage.clear()
  return <register/>
}


function App() {
  return (
    <BrowserRouter> <Routes>
      
      <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
      <Route path="/cart"element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
      <Route path="/charge"element={<ProtectedRoute><Charge/></ProtectedRoute>}/>
      <Route path="/dashboard"element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/history"element={<ProtectedRoute><History/></ProtectedRoute>}/>
      <Route path="/profit"element={<ProtectedRoute><Profit/></ProtectedRoute>}/>





        

        <Route path="/addProduct" element={<AddProduct/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
