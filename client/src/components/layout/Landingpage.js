import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <video
        src="/video/Person Working on an Apple MacBook.mp4"
        autoplay
        loop
        muted
      ></video>
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">JobForMe</h1>
          <p className="lead">Freelancing opportunity to all of you!</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
