import {useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function LoginPage({onClose}){
    const [activeTab,setActiveTab]= useState("login")


    return (
       <div className="form-box">
         <div className="register-login-tabs">
            
            <button className="login-tab" onClick={()=>setActiveTab("login")}>Login</button>
            <button className="register-tab" onClick={()=>setActiveTab("register")}>Register</button>
             <span className="close-btn" onClick={onClose}>X</span>
         </div>
         <div className="form-content">
             {activeTab==="login"? <Login />:<Register /> } 
             {console.log(activeTab)}
         </div>
       
       </div>
        
    )
   

    
}
export default LoginPage