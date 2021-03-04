import axois from "axios";

import { LOGIN_FAILED, LOGIN_SUCCESS } from "./types";
import { setAlert } from "./alert";

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ email, password });

  console.log(email, password);

  try {
    const res = await axois.post(
      "https://localhost:5001/api/name/authenticate",
      body,
      config
    );

    dispatch(setAlert("Login Successfull", "success"));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Invalid email or password", "danger"));
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

// import axois from "axios";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import SellerPage from "../pages/Seller";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

// // export const Login = async (email, password) => {
// //     let history = useHistory();
// //     history.push("../pages/Seller");
// // }

// export const Login = async (email, password) => {
//   // const history = useHistory();
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//     },
//   };
//   const user = {
//     FirstName: "Dhammika",
//     LastName: "Piyumal",
//     Address: "badulla",
//     UserType: "Admin",
//     Category: "Seller",
//     Email: "dhammika.piyumal@gmail.com",
//     Password: "dhammika123",
//     Messages: [],
//     Orders: [],
//   };
//   user.Email = email;
//   user.Password = password;

//   const body = JSON.stringify({ email, password });

//   try {
//     await axois
//       .post("https://localhost:5001/api/account/login", user)
//       .then((response) => {
//         if (response.data) {
//           console.log(response);
//           console.log("Success");
//           console.log(response.data.Category);
//         } else {
//           console.log("fail");
//         }
//       });
//     // console.log(response);
//     // console.log("Success");

//     //return res;
//   } catch (error) {
//     console.log(error);
//     console.log("errrrrrrrrrrrrrrrrrrr");
//     // return 'error';
//   }
// };

// export default Login;
