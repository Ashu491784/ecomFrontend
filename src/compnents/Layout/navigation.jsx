import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { use } from "react";


const Navigation = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handlelogout = () => {
        signOut();
        navigate("/Login");
    }
    return (
        <AppBar position="static" className="custom-toolbar">
            <Toolbar className="toolbar-content">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Poppins', }} className="brand-title">Tea E-Com🍃</Typography>
               <Button sx={{fontFamily: "seogor ui", marginRight:2}} color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                <Button sx={{fontFamily: "seogor ui", marginRight:2}} color="inherit" component={Link} to="/">Home</Button>
                {user ? (
                    <>
                        <Button onClick={handlelogout} className="logoutbtn">Logout</Button>
                        <Typography sx={{ fontFamily: 'Poppins', marginLeft: '10px' }}>Hello {user.name}</Typography>

                    </>
                ) : (
                    <>
                        <Link to="/Login" className="navlink">Login</Link>
                        <Link to="/Register" className="navlink">Register</Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navigation