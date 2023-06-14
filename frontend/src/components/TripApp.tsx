import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from './auth/AuthContext';
import { Navigate } from 'react-router-dom'
import AuthProvider from './auth/AuthContext';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './loginComponent/LoginComponent';
import SignupComponent from './SignupComponent';
import NavigationBar from './NavbarComponent/NavbarComponent';
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
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <NavigationBar/>
                    <Routes>
                          <Route path='' element={<WelcomeComponent/>}/>
                          <Route path='/signup' element={<SignupComponent/>}/>
                    </Routes>
                    {/* <FooterComponent/> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}











export default TripApp;

