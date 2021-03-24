import React from "react";
import { Link } from "react-router-dom";

const Navigationbar = (props) => {
  var islogged = false;

  return (
    <nav className="navbar ">
      <h1>
        <Link to="/">
          {/* <i class="fas fa-comments-dollar"></i> JobForMe */}
          <img
            className="photo"
            src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/765/4683342765_f43e76b4-4d93-4f52-b0e7-cc99ad1bf015.png?cb=1613721941"
          />
        </Link>
      </h1>
      <ul>
        {/* <li>
          <a href="/admin">Admin Panel</a>
        </li> */}
        <li>
          <Link
            to={{
              pathname: "/yourorders",
              state: props.buyerId,
            }}
          >
            Your Orders
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: "/seller",
              state: props.buyerId,
            }}
          >
            Become a Seller!
          </Link>
        </li>
        {/* <li>
          <a href="/seller">Become a Seller</a>
        </li> */}
        {/* <li>
          <Link to="/register">Register</Link>
        </li> */}

        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link
            to={{
              pathname: "/buyerprofile",
              state: props.buyerId,
            }}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigationbar;
