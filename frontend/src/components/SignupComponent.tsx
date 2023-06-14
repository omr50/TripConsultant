import React, { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { signUpService } from "./api/AuthenticationApiService"
import LoginUserPassword from "./loginComponent/subComponents/LoginUserPassword";
import LoginOptions from "./loginComponent/subComponents/LoginOptionsComponent";
import './loginComponent/loginComponentStyles.css'
interface Error {
        [key: string]: any;
    };

interface ChildProp {
    changeComp: (newComp: React.ReactNode, type: String) => void;
}

const SignupComponent: React.FC<ChildProp> = (props) => {
    const [username, setUsername] = useState('')
    const [alias, setAlias] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userExists, setUserExists] = useState(false)
    const [error, setError] = useState<Error>({})
    const navigate = useNavigate()

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
      }
    
    function handleAliasChange(event: React.ChangeEvent<HTMLInputElement>) {
        setAlias(event.target.value)
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
      }
    
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
    }

    function handleSubmit() {
        if (email == '') {
            let newError = { ...error };
            newError.email = "Enter a valid email";
            setError(newError)
        } 
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            let newError = { ...error };
            newError.email = "Invalid Email";
            setError(newError)
        }
        if (username.length < 3) {
            let newError = { ...error };
            newError.username = "Username must be greater than 3 characters.";
            setError(newError)
        }
        if (password.length < 6) {
            let newError = { ...error };
            newError.password = "Password must be at least 6 characters.";
            setError(newError)
        }
        if (alias.length < 1) {
            let newError = { ...error };
            newError.alias = "Alias must be at least 1 character.";
            setError(newError)
        }
        if (Object.keys(error).length != 0){
        signUpService(username, password, email, alias)
        .then(response=> {
            // user successfully stored in db.
            // redirect to login page (add message some how)
            console.log('a', response)
            navigate('/login')
        })
        .catch(error =>{
            if (error.response && error.response.status === 409){
                setUsername('')
                console.log("SET TRUE")
                setUserExists(true)
            }
        } )
    }
    }

        
    return (
        <div className="outer-div" style={{'display':'flex', 'flexDirection':'column', 'alignItems':'center'}}>
        {userExists? <div className="alert alert-danger mt-3">Username Already Exists.</div> : ""}
        {Object.values(error).map((err: String)=> {
            return <div className="alert alert-danger mt-3 fs-6">{err}</div>
        })}
        <Form className="form-container form-style">
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Form.Group controlId="username" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Username"
            />
            </Form.Group>

            <Form.Group controlId="username" className="form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
            />
            </Form.Group>

            <Form.Group controlId="username" className="form-group">
            <Form.Label>Alias</Form.Label>
            <Form.Control
                type="text"
                value={alias}
                    onChange={handleAliasChange}
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
            <a className="forgot-link" href="/">Forgot Password?</a>
            </div>
            </div>
            <div className="button-align">
            <Button onClick={handleSubmit} className="login-button">
            Sign Up
            </Button>

            <div className="bottom-line">
            <span className="lines">&#x2015;&#x2015;&#x2015;&#x2015;&#x2015;</span>Already a member?<span className="lines">&#x2015;&#x2015;&#x2015;&#x2015;&#x2015;</span>
            </div>
            </div>
            <div className="join-text"><b className="join-link" onClick={()=>{props.changeComp(<LoginUserPassword changeComp={props.changeComp}/>, 'LoginUserPassword')}}>Sign in</b> using your Tripadvisor account.</div>

        </Form>
      </div>
    )
    }

export default SignupComponent;