import React from "react";
import { Card, CardContent } from "@material-ui/core";

const ItemComment = ({ product }) => {
  return (
    <Card
      style={{
        marginBottom: "20px",
        width: "70%",
        margin: "20px auto 20px auto",
      }}
    >
      <CardContent
        style={{ backgroundImage: "linear-gradient(90deg, #62BBCF, #B0DDE7)" }}
      >
        <h1>username: {product.username}</h1>
      </CardContent>
      <CardContent>
        <h3>Rating: {product.rating}</h3>

        <label>{product.comment}</label>
      </CardContent>
    </Card>
  );
};

export default ItemComment;
