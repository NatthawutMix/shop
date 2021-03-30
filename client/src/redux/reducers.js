import { combineReducers } from "redux";
import user from "./user";
import products from "./products";

const reducer = combineReducers({ user: user, products: products });

export default reducer;
