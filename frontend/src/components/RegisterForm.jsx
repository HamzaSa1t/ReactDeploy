import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/form.css"
import LoadingIndicator from "./LoadingIndicator";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [UserType, setUserType] = useState();
    const [loading, setLoading] = useState(false);
    const options = ['Customer', 'Employee', 'Manager'];
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post("/api/user/register/", { username, password, profile_user: { user_type: UserType } });
               // localStorage.setItem(ACCESS_TOKEN, res.data.access);
              //  localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
               // navigate("/")
               console.log("successed!");
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
    
                if (errorData.error) {
                    setErrorMessage(errorData.error);
                } else if (errorData.user_type) {
                    setErrorMessage(errorData.user_type);
                } else if (errorData.username) {
                    setErrorMessage(errorData.username[0]);
                } else if (errorData.password) {
                    setErrorMessage(errorData.password[0]);
                } else {
                    setErrorMessage("An unknown error occurred.");
                }
            } else if (error.request) {
                setErrorMessage("No response from the server.");
            } else {
                setErrorMessage("Request failed: " + error.message);
            }
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Register</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <div>
            <label htmlFor="select">Choose a type:</label>
            <select
                id="type-select"
           //   name="type"
                value={UserType}  // Controlled component
                onChange={(e) => setUserType(e.target.value)}

            >
                {options.map((option) => (
                <option key={option} value={option}>
                {option}
                </option>
                ))}
            </select>
            </div>
            

            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">register</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
}

export default RegisterForm






