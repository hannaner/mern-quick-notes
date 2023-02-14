import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"

export default function AuthPage({ setUser }){
    return (
        <>
            <h2>Auth page</h2>
            <SignUpForm setUser={setUser}/>
            <br></br>
            <LoginForm setUser={setUser}/>
        </>
    )
}