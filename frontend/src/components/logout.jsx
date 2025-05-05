import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/Login"

function Logout() {

    localStorage.clear()
    return <Navigate to="/login" />
           
     
     }
     
     export default Logout