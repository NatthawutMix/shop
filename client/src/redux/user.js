import { USER_LOGIN, USER_LOGOUT } from "../types";

import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const userLogin = (userData) => {
  localStorage.setItem("jwtToken", userData.token);
  return (dispatch) => {
    dispatch({
      type: USER_LOGIN,
      payload: userData,
    });
  };
};

export const userLogout = () => {
  localStorage.removeItem("jwtToken");
  return (dispatch) => {
    dispatch({
      type: USER_LOGOUT,
    });
  };
};

export default user;
