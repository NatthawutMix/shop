import React, { useState } from "react";

import { plusQtyCart, removeFromCart } from "../redux/products";
import { Card, CardContent, Container, Button } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";

const ItemCart = ({ item, plusQtyCart, removeFromCart }) => {
  const [qty, setQty] = useState(item.qty);

  const handleQty = (event) => {
    setQty(event.target.value);
    plusQtyCart({ ...item, qty: event.target.value });
  };

  return (
    <Container>
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "30px",
          alignItems: "center",
          backgroundColor: "#f8f5f1",
        }}
      >
        <CardContent>
          <img
            style={{ width: "250px", height: "300px" }}
            src={item.imgURL}
            alt=""
          />
        </CardContent>
        <CardContent
          style={{
            width: "100%",
          }}
        >
          <h1>{item.name}</h1>
          <p>Description: {item.description}</p>
          <h3>Stock: {item.stock} ea</h3>
          <h3>
            Price: <label style={{ color: "#046582" }}>{item.price} Bath</label>
          </h3>

          <h4 style={{ position: "relative" }}>
            Qty:{" "}
            <input
              style={{ width: "auto", left: 0 }}
              type="Number"
              min="1"
              max={item.stock}
              value={qty}
              onChange={(event) => handleQty(event)}
            />{" "}
            ea
          </h4>
          <Button
            style={{ float: "right" }}
            variant="contained"
            color="secondary"
            onClick={() => removeFromCart(item._id)}
          >
            <DeleteIcon />
            REMOVE
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default connect(null, { plusQtyCart, removeFromCart })(ItemCart);
