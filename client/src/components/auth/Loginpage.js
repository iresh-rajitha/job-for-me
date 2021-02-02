import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "../auth/Login"
import { useHistory } from "react-router-dom";

const Loginpage = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("Success");
    // Login(email, password);
    history.push("/buyer");

    

    // const { history } = this.props;
    // history.push("../layout/Landingpage");
    // this.props.history.push("../layout/Landingpage");
    // return <Redirect to="../layout/Landingpage" push={true} />
  };

  const MyComponent = () => {
    history.push("../../App");
  }


  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign Into Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
        {/* <form className="form" onSubmit={MyComponent}> */}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="3"
            />
          </div>
          <input type="submit"  className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Do not have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Fragment>
    </section>
  );
};

export default Loginpage;
