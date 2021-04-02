import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import axios from "../axios";
import { useHistory, useParams } from "react-router";
import { useForm } from "react-hook-form";

import { Button } from "@material-ui/core";

import { updateProuct } from "../redux/products";

import "../css/CreateProduct.css";
import swal from "sweetalert";
// import DialogBox from "../util/DialogBox";

const SingleEdit = ({ updateProuct }) => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  // const [agreement, setAgreement] = useState(false);
  const [url, setUrl] = useState(null);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(`/products/${id}`);
      setProduct(res.data);
      setUrl(res.data.imgURL);
    };
    fetchData();
  }, [id]);

  const onSubmit = (data) => {
    data = {
      ...product,
      name: data.name,
      price: data.price,
      stock: data.stock,
      description: data.description,
      imgURL: data.imgURL,
    };
    let cleanup = true;
    axios
      .post("/products/update", data)
      .then((res) => {
        if (cleanup) {
          updateProuct(res.data);
          swal("Good job!", "You clicked the button!", "success").then(() => {
            history.push("/edit");
          });
        }
      })
      .catch((error) => {
        swal(error.response.data.message, {
          icon: "error",
          button: false,
        });
      });
    return () => {
      cleanup = false;
    };
  };

  /* const handleClose = () => {
    setAgreement(false);
  };

  const handleClickOpen = () => {}; */

  return (
    <div className="createproduct__container">
      {product && (
        <form className="createproduct__form" onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ textAlign: "center" }}>EDIT PRODUCT</h1>
          <br />
          <img src={url ? url : ""} alt="" />

          <label>Product name</label>
          <input
            name="name"
            defaultValue={product.name}
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
                defaultValue={product.price}
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
                defaultValue={product.stock}
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
            defaultValue={product.description}
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
            defaultValue={product.imgURL}
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
            UPDATE
          </Button>
        </form>
      )}

      {/* <DialogBox
        open={agreement}
        title={"Update ?"}
        description={""}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
      /> */}
    </div>
  );
};

export default connect(null, { updateProuct })(SingleEdit);
