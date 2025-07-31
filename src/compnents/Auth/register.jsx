import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TextField,FormControl,InputLabel, Select,  MenuItem,  Button, Box, Typography , Link} from "@mui/material";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleRegister = async (e) =>{
        e.preventDefault();
        try{
            await signUp(formData);
            navigate("/Login");

        }catch(error){
            setError(error.message || "Registration failed");
        }
    }
    
    return(
        <Box sx={{p:3,mt:5}}>
          {error && <p>{error}</p>}
            <form className="register-form" onSubmit={handleRegister}>
                <Typography variant="h4" gutterBottom sx={{fontFamily: 'Poppins',}} className="register-title ">🪴Register</Typography>
                <TextField label="Full Name" name="name" type="text"   margin="normal" className="register-text" value={formData.name} onChange={handleChange} required/>
                <TextField label="Email" type="email" name="email"  margin="normal" className="register-text" value={formData.email} onChange={handleChange} required/>
                <TextField label="password" type="password" name="password"   margin="normal" className="register-text" value={formData.password} onChange={handleChange} required/>
                
          <FormControl fullWidth margin="normal" className="register-text">
             <InputLabel>Role</InputLabel>
                 <Select label="Role" name="role" value={formData.role}  onChange={handleChange} required>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="saller">Seller</MenuItem>
                </Select>
        </FormControl>
        <button className="reg-btn" type="submit" sx={{fontFamily: 'Poppins', mt:2, mb:2, width:"30%"}} >Register</button>
         <Typography sx={{mt:2}}>
            Already have an account ? <Link href="/Login">Login Here</Link>
        </Typography>
        </form>
       
        </Box>
    );
}

export default Register