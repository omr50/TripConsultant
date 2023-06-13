import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../auth/AuthContext";
import '../loginComponentStyles.css'

function LoginUserPassword() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)


  const navigate = useNavigate()
  const authContext = useAuth()

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  async function handleSubmit() {
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`)
    } else {
      setShowErrorMessage(true)
    }
  }
    return (
      <Form className="form-container">
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Form.Group controlId="username" className="form-group">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
        </Form.Group>

        <Form.Group controlId="password" className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </Form.Group>
        <div className="form-group">
          <a href="/">Forgot Password?</a>
        </div>
        </div>
        <div className="button-align">
        <Button onClick={handleSubmit} className="login-button">
          Login
        </Button>
        </div>
      </Form>
    )
}

export default LoginUserPassword;