const express = require("express");
var router = express.Router();

router.post("/", function (req, res) {
  res.send({
    success : true
  });
});

module.exports = router;
