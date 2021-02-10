import React from "react";
import { Link } from "react-router-dom";

const Navigationbar = () => {
  var islogged= false;

  return (
    <nav className="navbar ">
      <h1>
        <Link to="/">
          <i class="fas fa-comments-dollar"></i> JobForMe
        </Link>
      </h1>
      <ul>
        <li>
          <a href="/admin">Admin Panel</a>
        </li>
        <li>
          <a href="/order">Order a Service</a>
        </li>
        <li>
          <a href="/seller">Become a Seller</a>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {
          islogged &&
          <li>
          <Link to="/login">Profile</Link>
        </li>
        }
          
        
      </ul>
    </nav>
  );
};

export default Navigationbar;
