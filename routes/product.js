var express = require("express");
var router = express.Router();
const { findById } = require("../model/products");
const { addTransaction } = require("../services/midtrans");

/* GET users listing. */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await findById(id);
  res.render("details", { product, user: req.session.user });
});

router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
});

router.post("/:id", async (req, res) => {
  const { size, paymentMethod } = req.body;
  const { id } = req.params;
  const { user } = req.session;

  const url = await addTransaction(id, paymentMethod, size, user);

  res.redirect(url);
});

module.exports = router;
