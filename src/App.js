import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
// import ProtectedRoute from "./compnents/Auth/ProtectedRoute";
import Login from './compnents/Auth/Login';


function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
      <Routes>
      
         <Route path="/login" element={<Login />}/>

      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );

}
export default App;
