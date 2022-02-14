var express = require("express");
var router = express.Router();
const { getData } = require("../model/products");
const { getByEmail, addUser } = require("../model/users");
const { compare } = require("../services/hash");

/* GET home page. */
router.get("/", async function (req, res) {
  const products = await getData();
  res.render("index", { title: "Express", products, user: req.session.user });
});

/* GET users listing. */
router.get("/register", function (req, res) {
  res.render("register");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/register", async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;
  await addUser(name, email, password, phoneNumber, address);
  req.session.user = {
    fullName: name,
    email,
    phoneNumber,
    address,
  };

  res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await getByEmail(email);

  if (user) {
    if (compare(password, user.password)) {
      req.session.user = {
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      };

      res.redirect("/");
    } else {
      res.render("login");
    }
  } else {
    res.render("login");
  }
});

router.get("/success", async (req, res) => {
  res.render("success-transaction");
});

module.exports = router;
