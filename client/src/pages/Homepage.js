import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "../axios";
import { Container, Grid } from "@material-ui/core";
import Product from "../components/Product";
import { setProducts } from "../redux/products";

const Homepage = ({ products, setProducts }) => {
  const fetchData = async () => {
    let res = await axios.get("/products");
    setProducts(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <div style={{ marginTop: "30px" }}>
        <Grid container justify="center" spacing={3}>
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} edit={false} />
            ))}
        </Grid>
      </div>
    </Container>
  );
};

export default connect((state) => ({ products: state.products.products }), {
  setProducts,
})(Homepage);
