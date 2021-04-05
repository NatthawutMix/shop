import React from "react";
import { connect } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import Product from "../components/Product";
import { removeProduct } from "../redux/products";
import axios from "../axios";
import swal from "sweetalert";

const EditProduct = ({ user, products, removeProduct }) => {
  const handleRemove = (product) => {
    axios
      .post("/products/delete", product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then(() => {
        removeProduct(product._id);
      })
      .catch((error) => {
        swal(error.response.data.message, {
          icon: "error",
          button: false,
        });
      });
  };
  return (
    <Container>
      {user ? (
        <div style={{ marginTop: "30px" }}>
          <Grid container justify="center" spacing={3}>
            {products &&
              products
                .filter((product) => product.ownerId === user.id)
                .map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                    edit={true}
                    removeProduct={() => handleRemove(product)}
                  />
                ))}
          </Grid>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please login..</h1>
      )}
    </Container>
  );
};

export default connect(
  (state) => ({ user: state.user.user, products: state.products.products }),
  { removeProduct }
)(EditProduct);
