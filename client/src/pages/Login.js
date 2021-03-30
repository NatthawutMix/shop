import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import axios from "../axios";
import { Redirect } from "react-router";
import { userLogin } from "../redux/user";
import "../css/Login.css";
import swal from "sweetalert";
import { connect } from "react-redux";

import { Button } from "@material-ui/core";

const Login = ({ user, userLogin }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    axios
      .post("/users/login", data)
      .then((res) => {
        userLogin(res.data);
      })
      .catch((error) => {
        swal(error.response.data.message, {
          icon: "error",
          button: false,
        });
      });
  };

  if (user) return <Redirect to="/" />;

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ textAlign: "center" }}>LOGIN</h1>
        <label>Username</label>
        <input
          name="username"
          ref={register({ required: true })}
          placeholder="username.."
        />
        {errors.username && errors.username.type === "required" && (
          <span>*Please enter username</span>
        )}
        <br />
        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true })}
          placeholder="password.."
        />
        {errors.password && errors.password.type === "required" && (
          <span>*Please enter password</span>
        )}
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "auto", width: "50%" }}
          type="submit"
        >
          LOGIN
        </Button>
        <label style={{ textAlign: "center", margin: "10px" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </label>
      </form>
    </div>
  );
};

export default connect((state) => ({ user: state.user.user }), {
  userLogin,
})(Login);
