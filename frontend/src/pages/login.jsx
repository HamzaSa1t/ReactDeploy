import LoginForm from "../components/Loginform.jsx"
import { Link } from 'react-router-dom';
import Tail from "../components/Tail.jsx";
import "../styles/background.css"

function Login() {

return(
<div>

<div>
      <header className="header">   
        <h1>Amazoo</h1>
        <p className="tagline">We sell products you love!</p>
    </header>  
     </div>
     
<div className="backl"> 
<LoginForm/>
<br></br>
<p>
          <Link to="/register">
              Register
            </Link>
          </p>
</div>
<Tail />
</div>    
)
}



export default Login




