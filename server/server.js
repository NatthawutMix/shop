const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 8001;

const { MONGODB } = require("./config.js");
const usersRoute = require("./routes/users");
const productsRoute = require("./routes/products");

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB Connect`));

app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/users", usersRoute);
app.use("/products", productsRoute);

app.listen(port, () => console.log(`Connecting PORT:${port}`));
