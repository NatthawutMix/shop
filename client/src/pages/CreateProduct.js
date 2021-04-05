import React, { useState } from "react";
import axios from "../axios";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { addProduct } from "../redux/products";

import "../css/CreateProduct.css";
import swal from "sweetalert";

const CreateProduct = ({ user, addProduct }) => {
  const { register, handleSubmit, errors } = useForm();
  const [url, setUrl] = useState(null);
  const onSubmit = (data) => {
    axios
      .post("/products/create", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((res) => {
        addProduct(res.data);
      })
      .catch((error) => {
        swal(error.response.data.message, {
          icon: "error",
          button: false,
        });
      });
  };

  return (
    <div className="createproduct__container">
      {user ? (
        <form className="createproduct__form" onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ textAlign: "center" }}>CREATE PRODUCT</h1>
          <br />

          <img src={url} alt="" />
          <label>Product name</label>
          <input
            name="name"
            ref={register({ required: true })}
            placeholder="name.."
          />
          {errors.name && errors.name.type === "required" && (
            <span>*Please enter product name.</span>
          )}
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "20px", marginRight: "5px" }}>
              <label>Price</label>
              <br />
              <input
                name="price"
                type="number"
                min="0"
                ref={register({ required: true })}
              />
            </div>
            <div style={{ marginLeft: "5px", marginRight: "20px" }}>
              <label>Stock</label>
              <br />
              <input
                name="stock"
                type="number"
                min="0"
                ref={register({ required: true })}
              />
            </div>

            {errors.description && errors.description.type === "required" && (
              <span>*Please enter description.</span>
            )}
          </div>

          <br />
          <label>Description</label>
          <textarea
            name="description"
            type="text"
            ref={register({ required: true })}
            placeholder="description.."
          />
          {errors.description && errors.description.type === "required" && (
            <span>*Please enter description.</span>
          )}
          <br />
          <label>Image URL</label>
          <input
            name="imgURL"
            type="text"
            ref={register({ required: true })}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="url.."
          />
          {errors.imgURL && errors.imgURL.type === "required" && (
            <span>*Please enter image url.</span>
          )}
          <br />
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "auto", width: "50%" }}
            type="submit"
          >
            CREATE
          </Button>
        </form>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please login..</h1>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    user: state.user.user,
  }),
  { addProduct }
)(CreateProduct);
