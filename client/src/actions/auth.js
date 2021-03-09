import axois from "axios";

import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";
import { setAlert } from "./alert";

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axois.post(
      "https://localhost:5001/api/name/authenticate",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
