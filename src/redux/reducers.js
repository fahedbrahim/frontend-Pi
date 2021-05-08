import { combineReducers } from "redux";

import cart from "./slices/cartSlice";
import users from "./slices/admin/usersSlice";
import companies from "./slices/admin/compwaitSlice";
import user from "./slices/userSlice"

const reducers = combineReducers({
  users,
  user,
  cart,
  companies
});

export default reducers;
