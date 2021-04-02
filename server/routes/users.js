const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { SECRET_KEY } = require("../config");

function geneateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      // email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

router.post("/register", async (req, res) => {
  try {
    let { email, password, username } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      throw new Error("This username is taken!");
    }

    password = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      username,
      password,
      createdAt: new Date().toISOString(),
    });

    const data = await newUser.save();

    const token = geneateToken(data);

    res.json({
      ...data._doc,
      id: data._id,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user) throw new Error("Username or Password is wrong!");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Username or Password is wrong!");

    const token = geneateToken(user);

    res.json({
      ...user._doc,
      id: user._id,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
