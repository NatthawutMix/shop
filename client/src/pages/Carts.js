import React, { useEffect, useState } from "react";

import { Container, Card, CardContent, Button } from "@material-ui/core";

import { connect, useDispatch, useSelector } from "react-redux";

import { clearCart } from "../redux/products";

import ItemCart from "../components/ItemCart";
import DialogBox from "../util/DialogBox";
import axios from "../axios";
import swal from "sweetalert";

const Carts = ({ cart }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [countItem, setCountItem] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    let count = 0;
    let prices = 0;
    cart.forEach((item) => {
      count += item.qty;
      prices += item.qty * item.price;
    });
    setCountItem(count);
    settotalPrice(prices);
  }, [cart]);

  const handleCheckOut = () => {
    let order = {
      total: countItem,
      price: totalPrice,
      products: cart,
      address: address,
    };

    axios
      .post("/products/order", order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then(() => {
        dispatch(clearCart());
        setOpen(false);
      })
      .catch((error) => {
        swal(error.response.data.message, {
          icon: "error",
          button: false,
        });
      });
  };

  const checkAuth = () => {
    if (!user) {
      swal(`Please Login`, {
        icon: "error",
        button: false,
      });
    } else {
      setOpen(true);
    }
  };
  return (
    <Container>
      {cart.map((item, index) => (
        <ItemCart key={index} item={item} />
      ))}
      <Card style={{ marginTop: "20px" }}>
        <CardContent style={{ backgroundColor: "#62BBCF" }}>
          <h1>Your cart</h1>
        </CardContent>
        <CardContent>
          <h2>Order Total: {countItem} ea</h2>
          <h2>Price Total: {totalPrice} Bath</h2>
          <Button
            style={{
              float: "right",
              backgroundColor: "#4D48C7",
              color: "#FFFFFF",
              marginBottom: "20px",
            }}
            onClick={checkAuth}
          >
            Check Out
          </Button>
        </CardContent>
      </Card>
      <DialogBox
        open={open}
        title={"Your address"}
        description={
          <textarea
            cols="50"
            rows="4"
            style={{ fontFamily: "Balsamiq Sans" }}
            onChange={(event) => setAddress(event.target.value)}
          />
        }
        handleClickOpen={handleCheckOut}
        handleClose={() => setOpen(false)}
      />
    </Container>
  );
};

export default connect(
  (state) => ({
    cart: state.products.cart,
  }),
  null
)(Carts);
