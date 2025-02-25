import Form from "../components/Loginform"

function Login() {
    return <Form route="/api/token/" method="login" />
}

export default Login