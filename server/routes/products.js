const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

const checkAuth = require("../util/check-auth");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.send(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    let { name, price, description, imgURL, stock } = req.body;
    const user = checkAuth(req.headers.authorization);

    const newProduct = new Product({
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

    const product = await newProduct.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/delete", async (req, res) => {
  try {
    let { id, ownerId } = req.body;
    const user = checkAuth(req.headers.authorization);

    if (user.id !== ownerId) throw new Error("You are not the owner");

    const product = await Product.findById(id);
    await product.delete();

    res.send("Deleted Successfully");
    // res.send(id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    let data = req.body;
    const user = checkAuth(req.headers.authorization);

    if (user.id !== data.ownerId) throw new Error("You are not the owner");

    const product = await Product.findById(data._id);
    Object.assign(product, data);
    await product.save();

    res.send(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
