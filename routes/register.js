const express = require("express");
var router = express.Router();
const con = require("../lib/db.js");
const encrypt = require("../lib/crypto");

router.post("/", function (req, res) {
  var post = req.body;
  var pwd = encrypt.encrypt(post.pwd);
  con.query(
    "SELECT id FROM user WHERE id=?",
    [post.id],
    function (err, result) {
      if (result[0] === undefined) {
        con.query(
          "INSERT INTO user (id, name, pwd) VALUES (?, ?, ?)",
          [post.id, post.name, pwd],
          function (err, result) {
            if (err) throw err;
            res.send("계정 생성됨");
          }
        );
      } else {
        res.send("존재하는 아이디");
      }
    }
  );
});
// router.get("/", function(req, res){
//     res.render("register", {});
// });

// router.get("/:message", function(req, res){
//     var error = "";
//     if(req.params.message === "id"){
//         error = "ID already exists. Please use another id."
//     }
//     res.render("register", {message : error});
// });

// router.post("/process", function(req, res){
//     var post = req.body;
//     var pwd = encrypt.encrypt(post.pwd);

//     con.query("SELECT id FROM user WHERE id=?", [post.id], function(err, result){
//         if(result[0] === undefined){
//             con.query("INSERT INTO user (id, name, pwd) VALUES (?, ?, ?)",
//             [post.id, post.name, pwd],
//             function(err, result){
//                 if(err) throw err;
//                 res.redirect("/login/created");
//             }
//             );
//         }
//         else{
//             res.redirect("/register/id");
//         }
//     });
// });

module.exports = router;
