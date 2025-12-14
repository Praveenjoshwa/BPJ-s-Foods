import React, {  useContext, useState } from 'react'
import "./LoginPop.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"


const LoginPopup = ({setShowLogin}) => {
  const {url,setToken} =useContext(StoreContext);

    const [currState,searchCurrState]=useState("Login");
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })
     const onChangeHandler = (event)=>{
      const name =event.target.name;
      const value =event.target.value;
      setData(data=>({...data,[name]:value}))
     }
     const onLogin=async(event)=>{
      event.preventDefault()
      let newUrl =url;
      if (currState==='Login') {
        newUrl +="/api/user/login"
      }else{
        newUrl +="/api/user/register"

      }
      const response =await axios.post(newUrl,data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
      }else{
        alert(response.data.message)
      }
     }
    
  return (
    <div>
      <div className="login-popup">
        <form action="" onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>}
                
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required />
                <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />

            </div>
            <button type='submit'>{currState==="Sign up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
              <input type="checkbox" required/>
              <p>By Continuing , i agree to the terms of use and policy privacy.</p>
            </div>
            {currState==='Login'?
            <p>Create a new account?<span onClick={()=>searchCurrState("Sign up")}>Click Here</span></p>
            :
            <p>Already have an account?<span onClick={()=>searchCurrState("Login")}>Login here</span></p>
            }
        </form>
    </div>
    </div>
  )
}
export default LoginPopup
