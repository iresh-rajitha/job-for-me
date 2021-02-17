import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Register } from "../auth/Register";
import axois from "axios";

const user = {
  FirstName: "",
  LastName: "",
  Address: "",
  UserType: "",
  Category: "",
  Email: "",
  Password: "",
  Messages: [],
  Orders: [],
};
const Registerpage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    Register(name, email, password);
    console.log("Page");

    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      // const newUser = {
      //   name,
      //   email,
      //   password
      // }
      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }
      //   const body = JSON.stringify(newUser);
      //   const res = await axios.post('api/users', body, config);
      //   console.log(res.data);
      // } catch(err) {
      //   console.error(err.response.data);
      // }

      try {
        user.FirstName = name;
        user.Email = email;
        user.Password = password;
        axois.post("https://localhost:5001/api/user", user).then((response) => {
          console.log(response);
        });
      } catch (error) {
        console.log(error);
        console.log("errrrrrrrrrrrrrrrrrrr");
      }
    }
  };

  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
    </section>
  );
};

export default Registerpage;
