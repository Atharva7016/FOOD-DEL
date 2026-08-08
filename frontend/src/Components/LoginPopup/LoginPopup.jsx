import React , { useState, useContext } from 'react'
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const LoginPopup = ( {setShowLogin} ) => {
  const {url,setToken,loadCartData} = useContext(StoreContext);
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "https://food-del-admin-aud7.onrender.com";
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setData( data => ({...data,[name]:value}))
  }
  const onLogin = async (event) => {
    event.preventDefault();
    if (currState === "Sign Up" && !/^\d{10}$/.test(data.phone)) {
      alert("Please enter a valid 10 digit phone number");
      return;
    }

    if (currState === "Admin Login") {
      try {
        const response = await axios.post(url + "/api/admin/login", {
          email: data.email,
          password: data.password
        });
        if (response.data.success) {
          setShowLogin(false);
          window.location.href = `${adminUrl}?token=${encodeURIComponent(response.data.token)}`;
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Admin login failed. Backend may not be updated yet. Please redeploy backend.");
      }
      return;
    }

    try {
      let newUrl = url;
      if(currState === "Login"){
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }
      const response = await axios.post(newUrl,data);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        await loadCartData(response.data.token);
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    } catch (error) {
      alert("Login failed. Please try again.")
    }
  }
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2> {currState} </h2>
          <img onClick={ () => setShowLogin(false) } src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popup-inputs'>
          { currState === "Sign Up" ? <>
            <input name="name" value={data.name} onChange={onChangeHandler} type="text" placeholder='Your Name' required />
            <input name="phone" value={data.phone} onChange={onChangeHandler} type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} placeholder='10 digit Phone Number' required />
          </> : <></> }
          <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder={currState === "Admin Login" ? "Admin Email" : "Your email"} required />
          <input name="password" value={data.password} onChange={onChangeHandler} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>
          {currState === "Sign Up" ? "Create Account" : currState === "Admin Login" ? "Admin Login" : "Login"}
        </button>
        {currState !== "Admin Login" && (
          <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
        )}
        { currState === "Login" && (
          <>
            <p>Create a new account? <span onClick={()=> setCurrState('Sign Up')}>Click Here</span></p>
            <p>Admin access? <span onClick={()=> setCurrState('Admin Login')}>Admin Login</span></p>
          </>
        )}
        { currState === "Sign Up" && (
          <p>Already have an account? <span onClick={()=> setCurrState("Login")}>Login here</span></p>
        )}
        { currState === "Admin Login" && (
          <p>Customer account? <span onClick={()=> setCurrState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  )
}
export default LoginPopup;
