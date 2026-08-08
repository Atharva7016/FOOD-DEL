import React, { useState, useContext } from 'react'
import "./Navbar.css"
import { assets } from "../../assets/assets"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ( {setShowLogin} ) => {
  const [menu,setMenu] = useState("home");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  const handleSectionClick = (id, name) => (e) => {
    e.preventDefault();
    setMenu(name);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  }

  const handleHomeClick = (e) => {
    setMenu("home");
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to="/" onClick={handleHomeClick} className={ menu === "home" ? "active":"" } > home </Link>
        <a href='#explore-menu' onClick={handleSectionClick('explore-menu', 'menu')} className={ menu === "menu" ? "active":"" } > menu </a>
        <a href='#app-download' onClick={handleSectionClick('app-download', 'mobile-app')} className={ menu === "mobile-app" ? "active":"" } > mobile-app </a>
        <a href='#footer' onClick={handleSectionClick('footer', 'contact-us')} className={ menu === "contact-us" ? "active":"" } > contact-us </a>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-basket-icon'>
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}> </div>
        </div>
        { !token ? <button onClick={ () => setShowLogin(true) }> sign in</button>
        :<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className='nav-profile-dropdown'>
            <li onClick={() => navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={() => navigate("/pastorders")}><img src={assets.bag_icon} alt="" /><p>Past Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
         </div>
        }
      </div>
    </div>
  )
}
export default Navbar;
