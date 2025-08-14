import { useState } from "react";
import { useLogin } from "../contexts/loginContext";


function Login() {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const {isLoggedIn,setIsLoggedIn,setCurrUser}=useLogin()
  // const [isLoggedIn,setIsLoggedIn]=useState(False)// TO create a global state later
   
  const handleLogin=async(e)=>{
    e.preventDefault()
    if(username && password && email)
    { 
      //login
      try{
        const res= await fetch("http://localhost:5000/users/login",{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email,password})
        }.then(res=>res.json())
        .then(data=>{
          if(res.ok)
          {
            setIsLoggedIn(true)
            setCurrUser(data.userData)

          }
        })

      
      
      )



        if (!res.ok) {
          // error response like 400, 401, 500
          const errorData = await res.json();
          alert("Login failed: " + errorData.message);
          console.log("Login failed: " + errorData.message);
          return;
          }
        
          console.log(`${res.message}`)

          
        }catch(e){
          console.log(e)
        }
      }
    else{
      alert("Enter all credentials")
    }

  }
  
  return (
    <form className="login-form">
      <div className="input-pair">
        <label htmlFor="username-field">Username:</label>

        <input id="username-field" 
          type="text" 
          placeholder="Enter username.." 
          className="username-field" 
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}  />
      </div> 

      <div className="input-pair">
        <label htmlFor="email-field">Username:</label>

        <input id="email-field" 
          type="text" 
          placeholder="Enter email.." 
          className="email-field" 
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}  />
      </div>

      <div className="input-pair">
        <label htmlFor="password-field">Password:</label>
        <input id="password-field" 
         type="password" 
         placeholder="Enter password.." 
         className="password-field"
         value={password}
         onChange={(e)=>{setPassword(e.target.value)}} />
      </div>


      <button type="submit"
       className="login-btn"
       onSubmit={handleLogin}>Login</button>
    </form>
  );
}

export default Login;