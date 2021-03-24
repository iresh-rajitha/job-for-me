import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import { sellers } from "./sellers";
import { messages } from "./messages";

export default combineReducers({
  alert,
  auth,
  sellers,
  messages,
});
