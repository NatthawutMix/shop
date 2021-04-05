const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");
const router = express.Router();

const checkAuth = require("../util/check-auth");

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id);
    res.send(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    let { name, price, description, imgURL, stock } = req.body;

    let user = checkAuth(req.headers.authorization);

    let newProduct = new Product({
      ownerId: user.id,
      name: name,
      description: description,
      price: price,
      imgURL: imgURL,
      stock: stock,
      commentsList: [],
      ratingList: [],
      createdAt: new Date().toISOString(),
    });

    let product = await newProduct.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/delete", async (req, res) => {
  try {
    let { _id, ownerId } = req.body;
    const user = checkAuth(req.headers.authorization);

    if (user.id !== ownerId) throw new Error("You are not the owner");

    let product = await Product.findById(_id);
    await product.delete();

    res.send("Deleted Successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    let data = req.body;
    let user = checkAuth(req.headers.authorization);

    if (user.id !== data.ownerId) throw new Error("You are not the owner");

    const product = await Product.findById(data._id);
    Object.assign(product, data);
    await product.save();

    res.send(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/comment", async (req, res) => {
  try {
    let data = req.body;

    let user = checkAuth(req.headers.authorization);
    if (data.comment.trim() === "") {
      throw new Error("Comment body must not empty");
    }
    let product = await Product.findById(data._id);

    let comment = product.comments.find((c) => c.id === user.id);

    if (comment) throw new Error("Commented");

    if (product) {
      product.comments.unshift({
        rating: data.rating,
        comment: data.comment,
        id: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      await product.save();
      res.json(product);
    } else throw new Error("Product not found");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/order", async (req, res) => {
  try {
    let data = req.body;
    let user = checkAuth(req.headers.authorization);
    data.products.map(
      async (product) =>
        await Product.updateOne(
          { _id: product._id },
          { stock: product.stock - product.qty },
          function (err) {
            if (err) throw new Error(err);
          }
        )
    );
    let newOrder = new Order({
      ...data,
      orderIdBy: user.id,
      orderNameBy: user.username,
    });

    let order = await newOrder.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
