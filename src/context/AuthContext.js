import {createContext, useContext, useState, useEffect} from "react";
import {login, register, getProfil} from "../services/auth";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(  loaduser = async() => {
       try{
        const token = localStorage.getItem('token');
        if(token){
           const userData = await getProfil();
           setUser(userData);          
        }
       }catch(error){
        console.log(error);
       }finally{
        setloading(false);
       }
       loaduser();
    }, []);

    const signIn = async(credentials) => {
        try{
            const {token, user} = await login(credentials);
            localStorage.setItem('token', token);
            setUser(user);
        }catch(error){
            throw error.response.data;
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
    };
 
    export const useAuth = () => useContext(AuthContext);


