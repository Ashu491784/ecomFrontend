import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
// import ProtectedRoute from "./compnents/Auth/ProtectedRoute";
import Login from './compnents/Auth/Login';
import Dashboard from "./pages/dashboard";
import Navigation from "./compnents/Layout/navigation";
import Register from "./compnents/Auth/register";
import Home from "./pages/Home";



function App(){
  return(
    
    <AuthProvider>
      <BrowserRouter>
      <Navigation/>
      <Routes>
        
         <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
           <Route path="/Register" element={<Register />}/>
          <Route path="/" element={<Home />}/>

      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );

}
export default App;
