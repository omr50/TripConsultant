import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

function WelcomeComponent() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/login')
  }
  return (
    <Button onClick={handleClick}>Goto Login Page</Button>
  )
}

export default WelcomeComponent;