import React, { useEffect, useState } from "react";

import { Container, Card, CardContent } from "@material-ui/core";

import { connect } from "react-redux";
import ItemCart from "../components/ItemCart";

const Carts = ({ cart, user }) => {
  const [countItem, setCountItem] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);

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
  return (
    <Container>
      {cart.map((item, index) => (
        <ItemCart key={index} item={item} />
      ))}
      <Card>
        <CardContent>
          {user && <h1>{user.username}</h1>}
          <h2>Order Total: {countItem} ea</h2>
          <h2>Price Total: {totalPrice} Bath</h2>
        </CardContent>
      </Card>
    </Container>
  );
};

export default connect(
  (state) => ({
    user: state.user.user,
    cart: state.products.cart,
  }),
  null
)(Carts);
