/* import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/register';
import AddProduct from './components/AddProduct';
import ViewProduct from './pages/ViewProduct';
import EditProduct from './pages/EditProduct';
import Basket from './pages/Basket';
import Charge from './pages/charge';
import EmployeeHistory from './pages/employeeHistory';
import Dashboard from './pages/dashboard';
import Tail from './components/Tail'; // Import Tail component
import notFound from './pages/NotFound'; // Import notFound component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/ViewProduct/:pk" element={<ViewProduct />} />
        <Route path="/EditProduct/:pk" element={<EditProduct />} />
        <Route path="/Basket/:pk" element={<Basket />} />
        <Route path="/Charge" element={<Charge />} />
        <Route path="/EmployeeHistory" element={<EmployeeHistory />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/notFound" element={<notFound />} />
      </Routes>
      <Tail /> {/* Add Tail component here if you want it on every route 
    </Router>
  );
}

export default App;
 */