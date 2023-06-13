import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import LoginComponent from "./loginComponent/LoginComponent";

function WelcomeComponent() {
  const [signup, setSignup] = useState<boolean>(false)
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate('/login')
  }

  function handleClose() {
    setSignup(false);
  }
  const overlayStyles: React.CSSProperties = {
    'position': 'fixed',
    'top': 0,
    'left': 0,
    'width': '100%',
    'height': '100%',
    'backgroundColor': 'rgba(0, 0, 0, 0.5)', // Adjust the opacity (0.5 in this case) to control transparency
    'zIndex': 1000, // Set a higher z-index to ensure it appears above other elements
  };
  const overlayStyles2: React.CSSProperties = {
    position: 'fixed',
    fontSize: '20px',
    borderRadius: "20px",
    display: 'flex',
    flexDirection: 'column',
    top: 80,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '32%',
    minHeight: '500px',
    maxHeight: '80%',
    marginBottom: '20px',
    backgroundColor: 'rgba(255, 255, 255)', // Adjust the opacity (0.5 in this case) to control transparency
    zIndex: 1001, // Set a higher z-index to ensure it appears above other elements
  };
  
  return (

    <div>
      {signup && <LoginComponent closeForm={handleClose}/>}
      {signup && <div style={overlayStyles} onClick={()=>{handleClose()}}/>}
      <Button onClick={()=>{navigate('/login')}}>Goto Login Page</Button>
      <Button onClick={()=>{navigate('/signup')}}>Goto Signup Page</Button>
      <Button onClick={()=>{setSignup(!signup)}}> open the signup bar</Button>
    </div>
  )
}

export default WelcomeComponent;