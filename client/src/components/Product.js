import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";

const Product = ({ product, edit, removeProduct }) => {
  return (
    <Card
      key={product._id}
      style={{
        width: "250px",
        marginTop: "50px",
        margin: "10px",
        boxShadow: `0 4px 8px 0 rgba(141, 141, 141, 0.2),
                0 6px 20px 0 rgba(153, 153, 153, 0.19)`,
      }}
    >
      {edit && (
        <CardActions
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Button color="secondary" onClick={() => removeProduct()}>
            <DeleteOutlineIcon color="secondary" />
          </Button>
          <Link to={`/edit/${product._id}`}>
            <Button>
              <EditIcon />
            </Button>
          </Link>
        </CardActions>
      )}
      <Link
        style={{ textDecoration: "none", color: "#000000" }}
        to={`/${product._id}`}
      >
        <CardActionArea disabled={edit ? true : false}>
          <img
            style={{ width: "250px", height: "300px" }}
            src={product.imgURL}
            alt=""
          />
          <CardContent>
            <Typography
              style={{
                fontFamily: `Balsamiq Sans`,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {product.name}
            </Typography>
            <Typography
              style={{
                fontFamily: `Balsamiq Sans, cursive`,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontFamily: `Balsamiq Sans, cursive`,
            marginTop: "5px",
          }}
        >
          Price: {product.price} Bath
        </Typography>
        {/* <Button
          style={{ backgroundColor: "#9ede73" }}
          size="small"
          variant="contained"
          disabled={edit ? true : false}
          onClick={handleAddToCart}
        >
          BUY
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default Product;
