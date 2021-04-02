import React, { useEffect } from "react";

import { Card, CardContent, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const AddItemCart = ({ product, removeFromPreview }) => {
  useEffect(() => {
    setTimeout(function () {
      removeFromPreview(product._id);
    }, 2000);
  }, []);

  return (
    <Card style={{ marginBottom: "10px", width: "275px" }}>
      <button
        style={{
          float: "right",
          backgroundColor: "transparent",
          border: "none",
        }}
        onClick={() => removeFromPreview(product._id)}
      >
        <CloseIcon />
      </button>

      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "100px", height: "100px" }}
            src={product.imgURL}
            alt=""
          />
          <div style={{ marginLeft: "10px" }}>
            <Typography
              variant="h6"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "125px",
                fontFamily: `Balsamiq Sans`,
              }}
            >
              {product.name}
            </Typography>
            <Typography
              gutterBottom
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontFamily: `Balsamiq Sans`,
                width: "125px",
              }}
            >
              Price:{product.price} Bath
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddItemCart;
