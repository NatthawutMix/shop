import React from "react";
import { connect } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import Product from "../components/Product";

const EditProduct = ({ user, products }) => {
  return (
    <Container>
      {user ? (
        <div style={{ marginTop: "30px" }}>
          <Grid container justify="center" spacing={3}>
            {products &&
              products
                .filter((product) => product.ownerId === user.id)
                .map((product) => (
                  <Product key={product._id} product={product} edit={true} />
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
  {}
)(EditProduct);
