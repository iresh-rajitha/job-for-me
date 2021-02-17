import axois from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SellerPage from "../pages/Seller";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// export const Login = async (email, password) => {
//     let history = useHistory();
//     history.push("../pages/Seller");
// }

export const Register = async (name, email, password) => {
  // const history = useHistory();
  console.log("Register");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
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
  user.Email = email;
  user.Password = password;
  user.FirstName = name;

  // const body = JSON.stringify({ email, password });

  try {
    await axois
      .post("https://localhost:5001/api/user", user, config)
      .then((response) => {
        console.log(response);
      });
    // console.log(response);
    // console.log("Success");

    //return res;
  } catch (error) {
    console.log(error);
    console.log("errrrrrrrrrrrrrrrrrrr");
  }
};

export default Register;
