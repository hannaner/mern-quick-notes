import { useState } from "react"
// import * as userService from "../../utilities/users-service"
import { login } from "../../utilities/users-service"

export default function LoginForm({ setUser }){
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')

    function handleChange(event){
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        })
    }

    async function handleSubmit(event){
        try {
            event.preventDefault()
            const userToLogin = await login(credentials)
            setUser(userToLogin)
        } catch (error){
            setError("Oops! Couldn't login, try again")
        }
    }

    return (
        <div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Email</label>
                <input 
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <label>Password</label>
                <input 
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p className="error-message">{error}</p>
        </div>
    )
}