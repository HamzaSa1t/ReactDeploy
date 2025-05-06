import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import LoadingIndicator from "./LoadingIndicator";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";  
import { Link } from 'react-router-dom';

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [UserType, setUserType] = useState("Customer");
    const [loading, setLoading] = useState(false);
    const options = ["Customer", "Employee", "Manager"];
    const [errorMessage, setErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [userTypeError, setUserTypeError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        setLoading(true);
        e.preventDefault();
        setUsernameError("");
        setPasswordError("");
        setUserTypeError("");
        setErrorMessage("");

        try {
            const res = await api.post("api/user/register/", {username, password, profile_user: { user_type: UserType },});
            console.log(" rigester successed!");
            

            if (res.status === 201) {
                try {
                    const res2 = await api.post("api/user/signin/", { username, password });
                    console.log("Login succeeded!");

                    localStorage.setItem(ACCESS_TOKEN, res2.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res2.data.refresh);
                    navigate("/"); 
                } catch (error) {
                    console.log("Login Error:", error); 
                    setErrorMessage("Login failed: " + (error.response?.data?.detail || error.message));
                }
            }
           
        } catch (error) {
            console.log("Error response:", error);

            if (error.response && error.response.data) {
                const errorData = error.response.data;

                if (errorData.username) {
                    setUsernameError(errorData.username[0]);
                }
                if (errorData.password) {
                    setPasswordError(errorData.password[0]);
                }
                if (errorData.user_type) {
                    setUserTypeError(errorData.user_type[0]);
                }
                if (errorData.error) {
                    setErrorMessage(errorData.error);
                } else {
                    setErrorMessage("An unknown error occurred.");
                }
            } else if (error.request) {
                setErrorMessage("No response from the server.");
            } else {
                setErrorMessage("Request failed: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div> 

        <form onSubmit={handleRegister} className="form-container">
            <h1>Register</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <div>
                <label htmlFor="select">Choose a type:</label>
                <select
                    id="type-select"
                    value={UserType}
                    onChange={(e) => setUserType(e.target.value)}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {userTypeError && <p style={{ color: "red" }}>{userTypeError}</p>}
            </div>

            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                register
            </button>
            <p>

<Link to="/login">
    Login
  </Link>
</p>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>

        </div>
    );
}

export default RegisterForm;