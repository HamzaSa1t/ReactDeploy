import RegisterForm from "../components/RegisterForm"
import Structure from "../components/Structure"
import React, { useState } from 'react';
import img from "../assets/image.png"
import { Link } from 'react-router-dom';
import "../styles/background.css"

function Register() {

   

   return <div>

    <header className="header">
        
        <h1>Amazoo</h1>
        <p className="tagline">We sell products you love!</p>

        <p>

          <Link to="/login">
              Login
            </Link>

          </p>
    </header>    


<div  className="backl"> 
<RegisterForm/>
</div>


    </div>
}

export default Register

