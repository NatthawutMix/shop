import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { userLogin } from "../redux/user";

import swal from "sweetalert";

import axios from "../axios";
import { Redirect } from "react-router";

const Register = ({ user, userLogin }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      swal("Wrong crendetials..", {
        icon: "error",
        button: false,
      });
    }
    axios
      .post("/users/register", { ...data, email: null })
      .then((res) => {
        console.log(res.data);
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
        <h1 style={{ textAlign: "center" }}>REGISTER</h1>
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
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          ref={register({ required: true })}
          placeholder="confirm password.."
        />
        {errors.confirmPassword &&
          errors.confirmPassword.type === "required" && (
            <span>*Please enter confirmPassword</span>
          )}
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "auto", width: "50%" }}
          type="submit"
        >
          REGISTER
        </Button>
      </form>
    </div>
  );
};

export default connect((state) => ({ user: state.user.user }), {
  userLogin,
})(Register);
