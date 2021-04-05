const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
  orderIdBy: String,
  orderNameBy: String,
  total: String,
  price: String,
  products: Array,
  address: String,
});

module.exports = model("Order", orderSchema);
