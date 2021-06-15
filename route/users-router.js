const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users-model");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/users-model");
let router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send({ msg: "Not Existing User" });

  const validPass = req.body.password === user.password;
  if (!validPass) return res.status(400).send({ msg: "Wrong Credentials" });

  const token = jwt.sign({ _id: user._id }, "dsfsdfsdfsdgfghh");
  res.send({ authToken: token });
});

module.exports = router;
