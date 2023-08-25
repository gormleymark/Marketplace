import React, { useState, useEffect } from "react";
import { Slide } from "react-awesome-reveal";
import { Link as Scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  fetchCurrentUser,
} from "../../../../redux/features/userSlice";
import logo  from "../assets/LibertumColor.png";
import pdf from "../assets/LBM-whitepaper.pdf";
import { networks } from "../networks";

import "./NavBar.scss";


export default function NavBar() {

  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };


  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();

  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  const currentUser = useSelector((state) => state.user.currentUser);


  console.log(currentUser);
  console.log(allUsers);

  const handleLogin = () => {
    const redirectUri = `${window.location.origin}/mydashboard/`;
    loginWithRedirect({
      redirectUri: redirectUri,
    });
  };


  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        handleLogin();
      }
      if (user?.name && user?.email) {
        dispatch(fetchAllUsers());
        dispatch(
          fetchCurrentUser({
            email: user.email,
            name: user.name,
          })
        );

      }
    }
  }, [isAuthenticated, isLoading]);


  return (
    <>
       <nav className={`nav_items ${mobileMenuActive ? "active" : ""}`}>
        <img src={logo} alt="Libertum Logo" className="logo" />

        <div className={`mobile-menu-icon ${mobileMenuActive ? "active" : ""}`} onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`menu_items ${mobileMenuActive ? "active" : ""}`}>
          <li className="menu-li_items">
            <Link to="home" smooth={true} duration={500} className="menu-a_items">
              Home
            </Link>
          </li>
          <li className="menu-li_items">
            <a
              href="/whitepaper.pdf" // Cambiar la ruta al PDF correcta!!
              target="_blank"
              rel="noopener noreferrer"
              download="LBM-whitepaper.pdf"
              className="menu-a_items"
            >
              Whitepaper
            </a>
          </li>
          <li className="menu-li_items">
            <Link to="subscribe" smooth={true} duration={1000} className="menu-a_items">
              Contact
            </Link>
          </li>
          <li className="menu-li_items">
            <a href="/marketplace" rel="noreferrer" className="menu-a_items">
              Marketplace
            </a>
          </li>
          <li className="menu-li_items">
          {isAuthenticated ? (
            <a href="/logout" rel="noreferrer" className="sign-in">
              Log Out
            </a>
          ) : (
            <a href="/mydashboard" rel="noreferrer" className="sign-in">
              Log In
            </a>
          )}
          </li>
        </ul>
      </nav>
    </>
  );
}
