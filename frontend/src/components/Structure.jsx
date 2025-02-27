import React from 'react';
import { useState, useEffect } from "react";
import "../styles/Structure.css"; // Assuming you have a CSS file for styling
import api from "../api";
import { Link } from 'react-router-dom';
const Structure = () => {
  
  const [UserType, setUserType] = useState();
  const CustomerList =  [
    {name: "Home", path: "/history"  },
    {name: 'Cart', path: "/history"},
    {name: 'Charge', path: "/history"}, 
    {name: 'History', path: "/history"},
    {name: 'Log out', path:"/logout"},
  
  
  ];
  
  
  
  
  const ManagerList =  ['Home', 'Profit', 'History', 'Log out'];
  const EmployeeList = ['Home', 'Dashboard', 'Profit', 'History', 'Log out'];



      useEffect(() => {
          getUsername();
      }, []);
  

      
      const getUsername = () => {
          api
              .get("api/UserDetails/")
              .then((res) => res.data.profile_user.user_type)
              .then((user_type) => {
                  setUserType(user_type)
                  console.log(user_type);
              })
              .catch((err) => alert(err));
  
      }


      const CustomerHeader = () => {

        return <div> 
    
    <header className="header">
        
        <h1>Amazoo</h1>
        <p className="tagline">We sell products you love!</p>

        <ul className="horizontal-list">
        {CustomerList.map((item, index) => (
          <li key={index} className="horizontal-list-item">

          <Link to={item.path} className="list-link">
              {item.name}
            </Link>

          </li>
        ))}
      </ul>

    </header>    
    
        </div>
    
    }
    
    const ManagerHeader = () => {
    
        return <div> 
    
    <header className="header">
        
        <h1>Amazoo</h1>
        <p className="tagline">We sell products you love!</p>

    </header>    
    
        </div>
    
    }
    
    const EmployeeHeader = () => {
    
        return <div> 
    
    <header className="header">
        
        <h1>Amazoo</h1>
        <p className="tagline">We sell products you love!</p>

    </header>    
    
        </div>
    
    }

    const GuestHeader = () => {
    
      return <div> 
  
  <header className="header">
      
      <h1>Amazoo</h1>
      <p className="tagline">We sell products you love!</p>

  </header>    
  
      </div>
  
  }


    
    
    const Header = UserType === 'Customer' ? CustomerHeader :
    UserType === 'Manager' ? ManagerHeader :
    UserType === 'Employee' ? EmployeeHeader :
    () => <p>Unknown user type.</p>; // Default component







  return (
    <div>
      
      <Header/>

    </div>
  );
};

export default Structure;
