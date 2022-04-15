import LoginForm from '../components/LoginForm'
import Layout from '../components/Layout'

export default function Login() {
    return (
        <div className="flex justify-center">
            <LoginForm pushHome={true} />
        </div>
    )
}

Login.layout = Layout
