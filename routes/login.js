const express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

const JWTSecret = require("./../lib/secrets/jwt_secrets");
const con = require("../lib/db.js");
const encrypt = require("../lib/crypto");

router.post("/", function (req, res) {
  var post = req.body;
  // console.log(post.id);
  var pwd = encrypt.encrypt(post.pwd);
  console.log(pwd);

  con.query(
    "SELECT id, pwd FROM user WHERE id=?",
    [post.id],
    function (error, result) {
      if (error) throw error;
      if (result[0] === undefined) {
        res.send({
          message : "계정이 존재하지 않습니다."
        });
      } else if (pwd === result[0].pwd) {
        let token = jwt.sign(
          {
            id: result[0].id,
          },
          JWTSecret.secret,
          { expiresIn: "2h" }
        );
        res.json({
          token : token,
          loginSuccess : true
        });
      } else {
        res.send({
          message : "비밀번호가 일치하지 않습니다."
        });
      }
    }
  );
});

// router.get("/", function (req, res) {
//   res.render("login", {});
// });

// router.get("/:message", function (req, res) {
//   if (req.params.message === "fail") {
//     res.render("login", {
//       message:
//         "ID does not registered or password does not match. Please check again.",
//     });
//   } else if (req.params.message === "created") {
//     res.render("login", {
//       message: "User successfully created.",
//     });
//   }
// });

// router.post("/process", function (req, res) {
//   var post = req.body;
//   var pwd = encrypt.encrypt(post.pwd);

//   con.query(
//     "SELECT id, pwd FROM user WHERE id=?",
//     [post.id],

//     function (error, result) {
//       //console.log(pwd);
//       //console.log(result[0]);
//       if (error) throw error;

//       if (result[0] === undefined) {
//         res.redirect("/login/fail");
//       } else if (pwd === result[0].pwd) {
//         let token = jwt.sign(
//           {
//             id: result[0].id,
//           },
//           JWTSecret.secret,
//           { expiresIn: "2h" }
//         );
//         res.cookie("user", token);
//         res.redirect("/");
//       } else {
//         res.redirect("/login/fail");
//       }
//     }
//   );
// });

module.exports = router;
