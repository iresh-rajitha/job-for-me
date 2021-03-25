import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import { sellers } from "./sellers";

export default combineReducers({
  alert,
  auth,
  sellers,
});
