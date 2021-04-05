import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { useParams } from "react-router";

import { productRate } from "../util/util";
import { addToPreview, addToCart } from "../redux/products";

import {
  Card,
  CardContent,
  Container,
  Button,
  CardActions,
} from "@material-ui/core";

import swal from "sweetalert";
import ItemComment from "./ItemComment";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(`/products/${id}`);
      setProduct(res.data);
      setUrl(res.data.imgURL);
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (product.stock === 0) {
      swal("Over stock", {
        icon: "error",
        button: false,
      });
      return;
    }

    let limit = cart.findIndex(
      (item) => item._id === product._id && item.stock === item.qty
    );

    if (limit >= 0) {
      swal("Over stock", {
        icon: "error",
        button: false,
      });
    } else {
      dispatch(addToCart(product));
      dispatch(addToPreview({ ...product }));
    }
  };

  const handleComment = () => {
    if (comment.trim() === "") {
      swal("Comment is empty", {
        icon: "error",
        button: false,
      });
    }
    let data = {
      ...product,
      rating: parseInt(rating),
      comment: comment,
    };
    axios
      .post("/products/comment", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((res) => {
        setProduct(res.data);
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
      {product ? (
        <>
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "30px",
              alignItems: "center",
              backgroundColor: "#F7E3DA",
            }}
          >
            <CardContent>
              <img
                style={{ width: "250px", height: "300px" }}
                src={url ? url : ""}
                alt=""
              />
            </CardContent>
            <CardContent
              style={{
                width: "100%",
              }}
            >
              <h3
                style={{
                  float: "right",
                  backgroundColor: "yellow",
                  padding: "5px",
                  borderRadius: "10px",
                }}
              >
                Rating:
                {product && productRate(product)}
              </h3>
              <h1>{product.name}</h1>
              <p>Description: {product.description}</p>
              <h3>Stock: {product.stock} ea</h3>
              <h3>
                Price:{" "}
                <label style={{ color: "#268AFF" }}>{product.price} Bath</label>
              </h3>
              <Button
                style={{ backgroundColor: "#9ede73", color: "#000000" }}
                variant="contained"
                color="secondary"
                onClick={handleAddToCart}
              >
                BUY
              </Button>
            </CardContent>
          </Card>
          <Card
            style={{
              marginBottom: "20px",
              width: "70%",
              margin: "20px auto 20px auto",
            }}
          >
            <CardContent>
              <h2>
                Rating{" "}
                <input
                  style={{ textAlign: "center" }}
                  type="number"
                  defaultValue={1}
                  max="5"
                  min="1"
                  onChange={(event) => setRating(event.target.value)}
                />
              </h2>
              <textarea
                style={{ resize: "none" }}
                onChange={(event) => setComment(event.target.value)}
                name="description"
                type="text"
                cols="80"
                rows="4"
                placeholder="comment.."
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleComment}
              >
                Comment
              </Button>
            </CardActions>
          </Card>
          {product.comments.length !== 0 &&
            product.comments.map((item, index) => (
              <ItemComment key={index} product={item} />
            ))}
        </>
      ) : (
        ""
      )}
    </Container>
  );
};
export default SingleProduct;
