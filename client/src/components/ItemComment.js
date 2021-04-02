import React from "react";
import { Card, CardContent } from "@material-ui/core";

const ItemComment = ({ product }) => {
  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardContent>
        <h1>Rating: {product.rating}</h1>
        <h3>username: {product.username}</h3>
        <label>{product.comment}</label>
      </CardContent>
    </Card>
  );
};

export default ItemComment;
