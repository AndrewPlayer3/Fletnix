import SignUpForm from '../components/SignUpForm'
import Layout from '../components/Layout'

export default function SignUp() {
    return (
        <div className="m-auto">
            <SignUpForm />
        </div>
    )
}

SignUp.layout = Layout
