import RegisterForm from "../components/RegisterForm"
import Structure from "../components/Structure"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/background.css"
import Tail from "../components/Tail.jsx";

function Register() {

   return <div>

    <header className="header">
        
        <h1>Amazoo</h1>
        <p className="tagline">We sell products you love!</p>
    </header>    


<div  className="backl"> 
<RegisterForm/>
<br></br>
<p>

<Link to="/login">
    Login
  </Link>
</p>
</div>

<Tail />

    </div>
}

export default Register

