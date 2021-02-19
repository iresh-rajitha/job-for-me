import axois from "axios";

//import sendOTPmail from "./OTPmail";

import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";
import { setAlert } from "./alert";

export const Register = (name, email, password, confirmPassword) => async (
  dispatch
) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ name, email, password, confirmPassword });

  try {
    //sendOTPmail(email);

    const res = await axois.post(
      "https://localhost:5001/api/LogSignUp/signup/customer",
      body,
      config
    );
    console.log("Success");
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    dispatch(setAlert("Something is wrong at your end", "danger"));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// import axois from "axios";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import SellerPage from "../pages/Seller";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

// export const Login = async (email, password) => {
//     let history = useHistory();
//     history.push("../pages/Seller");
// }

// export const Register = async (name, email, password) => {
//   // const history = useHistory();
//   console.log("Register");
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//     },
//   };
//   const user = {
//     FirstName: "",
//     LastName: "",
//     Address: "",
//     UserType: "",
//     Category: "",
//     Email: "",
//     Password: "",
//     Messages: [],
//     Orders: [],
//   };
//   user.Email = email;
//   user.Password = password;
//   user.FirstName = name;

//   // const body = JSON.stringify({ email, password });

//   try {
//     await axois
//       .post("https://localhost:5001/api/user", user, config)
//       .then((response) => {
//         console.log(response);
//       });
//     // console.log(response);
//     // console.log("Success");

//     //return res;
//   } catch (error) {
//     console.log(error);
//     console.log("errrrrrrrrrrrrrrrrrrr");
//   }
// };

// export default Register;
