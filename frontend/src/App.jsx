import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login';

import Register from "./pages/register"
import Home from "./pages/home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Logout from "./components/logout"
import Profit from "./pages/profit"
import Charge from "./pages/charge"
import Dashboard from "./pages/dashboard"
import History from "./pages/history"
import AddProduct from "./components/AddProduct"
import Products from "./components/Product"
import EditProduct from "./pages/EditProduct"
import ViewProduct from "./pages/ViewProduct"
import AddBalance from "./pages/AddBalance"
import Basket from "./pages/Basket"
import Structure from "./components/Structure"
import ProductDetails from "./pages/ProductDetails"
import EmployeeHistory from "./pages/EmployeeHistory"
import Tail from "./components/Tail"
function App() {
  return (
    <BrowserRouter> <Routes>
      
      <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute>}/> 
      <Route path="/charge"element={<ProtectedRoute><Charge/></ProtectedRoute>}/>
      <Route path="/dashboard"element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/history"element={<ProtectedRoute><History/></ProtectedRoute>}/>
      <Route path="/profit"element={<ProtectedRoute><Profit/></ProtectedRoute>}/>
      <Route path="/ShowProducts"element={<ProtectedRoute><Products/></ProtectedRoute>}/>
      <Route path="/editProduct/:pk"element={<ProtectedRoute><EditProduct/></ProtectedRoute>}/>
      <Route path="/ViewProduct/:pk"element={<ProtectedRoute><ViewProduct/></ProtectedRoute>}/>"
      <Route path="/AddProduct"element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>"
      <Route path="/AddBalance"element={<ProtectedRoute><AddBalance/></ProtectedRoute>}/>
      <Route path="/Basket/:pk"element={<ProtectedRoute><Basket/></ProtectedRoute>}/>
      <Route path="/structure/:pk" element={<Structure />} />
      <Route path="/product/:pk" element={<ProductDetails />} />
      <Route path="/employeeHistory" element={<ProtectedRoute><EmployeeHistory/></ProtectedRoute>}/>
      <Route path="/tail" element={<Tail />} />






        

        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
