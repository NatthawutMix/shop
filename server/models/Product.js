const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  ownerId: String,
  name: String,
  price: String,
  stock: Number,
  imgURL: String,
  description: String,
  createdAt: String,
  ratingList: Array,
  commentsList: Array,
});

module.exports = model("Product", productSchema);
