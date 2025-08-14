import { useState } from "react";
import LoginPage from "./LoginPage";
import { Link } from "react-router-dom";
const NavBar=()=>{
    const [showModal,setShowModal]=useState(false)


    return (
        <div className="navbar-box">
           <div className="left-nav">
            <div><Link to="/">Home</Link></div>
            <div><Link to="/contacts">Contact</Link></div>
            <div><Link to="/">Account</Link></div>
            
            
            </div> 
            <div className="right-nav" onClick={()=>setShowModal(true)} ><div>Register/Signin</div></div>
            {showModal && <div className="login-page-modal"><LoginPage  onClose={()=>setShowModal(false)}/></div>}
        </div>
        
    );
};

export default NavBar