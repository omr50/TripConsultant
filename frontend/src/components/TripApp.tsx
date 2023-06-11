import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from './auth/AuthContext';
import { Navigate } from 'react-router-dom'
import AuthProvider from './auth/AuthContext';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
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
                    <Routes>
                        <Route path='/' element={<WelcomeComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                        {/* <Route path='/signup' element={<SignUpComponent/>}/> */}
                    </Routes>
                    {/* <FooterComponent/> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}











export default TripApp;

