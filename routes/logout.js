const express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.cookie("user", "");
  res.redirect("/");
});

module.exports = router;
