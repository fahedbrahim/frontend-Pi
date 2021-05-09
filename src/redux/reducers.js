import { combineReducers } from "redux";

import cart from "./slices/cartSlice";
import users from "./slices/admin/usersSlice";
import companies from "./slices/admin/compwaitSlice";
import user from "./slices/userSlice"
import providers from "./slices/providerSlice";

const reducers = combineReducers({
  users,
  user,
  cart,
  companies,
  providers
});

export default reducers;
