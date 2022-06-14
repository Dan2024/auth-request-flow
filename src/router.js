const express = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign(username, secret);
    res.json({ token });
  } else {
    res.status(400).json({ error: "username or password not correct" });
  }
});

router.get("/profile", (req, res) => {
  const [bearer, token] = req.header.authorization.split(" ");

  try {
    jwt.verify(token, secret);
    res.json(mockUser.profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
