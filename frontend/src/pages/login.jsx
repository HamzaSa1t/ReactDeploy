import LoginForm from "../components/Loginform"
import { Link } from 'react-router-dom';
import Tail from "../components/Tail.jsx";

function Login() {

return(
<div>

<div>
      <header className="header">   
        <h1>Amazoo</h1>
        <p className="tagline">We sell products you love!</p>
        <p>
          <Link to="/register">
              Register
            </Link>
          </p>
    </header>  
     </div>
<div> 
<LoginForm/>
</div>
<Tail />
</div>    
)
}



export default Login




