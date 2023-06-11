import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "./auth/AuthContext"
import { Button } from "react-bootstrap"
function LoginComponent() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alias,    setAlias] = useState('')
    const [location, setLocation] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    function handleAliasChange(event: React.ChangeEvent<HTMLInputElement>) {
      setAlias(event.target.value);
    }
  function handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
  }
    async function handleSubmit() {
        if (await authContext.login(username, password, alias, location)){
            // if the user is actually correct then we will
            // set that isAuthenticated is true in the context
            navigate(`/welcome/${username}`)
        }

        else{
            setShowErrorMessage(true)
        }
    }
    return (
        <div className="Login" style={{'display':'flex', 'flexDirection':'column', 'alignItems':'center'}}>
            <div className="LoginForm">
                <h1>Login</h1>
                {showErrorMessage && <div className='errorMessage alert bg-danger text-white'>Authentication Failed. Check credentials or refresh the page</div>}
                <div>
                    <div style={{'margin':'8px'}}>username</div>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>

                <div>
                    <div style={{'margin':'8px'}}>password</div>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <br></br>
                <div>
                    <Button onClick={handleSubmit}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;