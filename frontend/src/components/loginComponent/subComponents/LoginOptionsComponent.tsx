import { Button } from "react-bootstrap";
import LoginUserPassword from "./LoginUserPassword";
interface ChildProp {
  changeComp: (newComp: React.ReactNode) => void
}
const LoginOptions: React.FC<ChildProp>= (props) => {

  return (
    <div>
      <Button onClick={()=>{props.changeComp(<LoginUserPassword/>)}}>Sign In With Google</Button>
      <Button onClick={()=>{props.changeComp(<LoginUserPassword/>)}}>Sign In with Username/Password</Button>
    </div>
  )
}

export default LoginOptions;