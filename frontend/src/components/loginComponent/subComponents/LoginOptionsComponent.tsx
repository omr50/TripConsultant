import { Button } from "react-bootstrap";
import LoginUserPassword from "./LoginUserPassword";
interface ChildProp {
  changeComp: (newComp: React.ReactNode, type: String) => void
}
const LoginOptions: React.FC<ChildProp>= (props) => {

  return (
    <div className="signin-buttons">
      <div>
        <div className="subtext-div">Sign in to unlock the best of Tripadvisor.</div>
        <Button className="signin-button" onClick={()=>{props.changeComp(<LoginUserPassword/>, 'LoginUserPassword')}}><img className="google-image" src="https://static.tacdn.com/img2/google/G_color_40x40.png"/>Sign In With Google</Button>
      </div>
      <div>
        <Button className="signin-button button2-margin" onClick={()=>{props.changeComp(<LoginUserPassword/>, 'LoginUserPassword')}}><img className="mail-image" src="https://icons.iconarchive.com/icons/ionic/ionicons/32/mail-outline-icon.png" width="32" height="32"/>Sign In with Username/Password</Button>
      </div>
    </div>
  )
}

export default LoginOptions;