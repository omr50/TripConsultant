import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { ReactNode, useState } from 'react'
import { useAuth } from './auth/AuthContext';
import { Navigate } from 'react-router-dom'
import AuthProvider from './auth/AuthContext';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './loginComponent/LoginComponent';
import SignupComponent from './SignupComponent';
import NavigationBar from './NavbarComponent/NavbarComponent';
import LoginOptions from './loginComponent/subComponents/LoginOptionsComponent';
interface MyComponentProps {
  children: ReactNode;
}
function AuthenticatedRoute(props: MyComponentProps) {
    const authContext = useAuth()
    if (authContext.isAuthenticated)
        return props.children
    
        return <Navigate to="/login" />
}

function TripApp() {
    interface ChildProp {
        changeComp: ((newComp: React.ReactNode, type: String) => void) | null;
        closeComp: () => void;
    }
    const [component, setComponent] = useState<React.ReactNode>(<LoginOptions changeComp={changeComponent} closeForm={closeComp}/>)
    const [componentType, setComponentType] = useState<String>('LoginOption')
    const [signup, setSignup] = useState<boolean>(false)

    function changeComponent(newComponent: React.ReactNode, type: String) {
        setComponent(newComponent)
        setComponentType(type)
      }
    
    function closeComp() {
        setSignup(!signup);
    }

    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <NavigationBar changeComp={changeComponent} closeorOpenForm={closeComp} formIsOpen={signup}/>
                    <Routes>
                          <Route path='' element={<WelcomeComponent/>}/>
                          <Route path='/signup' element={<SignupComponent changeComp={changeComponent} closeForm={closeComp}/>}/>
                    </Routes>
                    {/* <FooterComponent/> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}











export default TripApp;

