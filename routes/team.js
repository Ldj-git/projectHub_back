const express = require("express");
var router = express.Router();
const con = require("../lib/db.js");
const JWTSecret = require("./../lib/secrets/jwt_secrets");
const jwt = require("jsonwebtoken");
//현재 로그인된 아이디 기준 가입된 팀
router.get("/", function (req, res) {
  var user = req.headers.user;
  //var user = req.cookies.user;
  jwt.verify(user, JWTSecret.secret, (err, decoded) => {
    if (err) {
      res.send("토큰 이상함..");
    } else {
      console.log(decoded.id);
      con.query(
        `select * from team where members like '%${decoded.id}%';`,
        (err, result) => {
          res.json(result);
        }
      );
    }
  });
});
//생성
router.post("/create", (req, res) => {
  var input = req.body;
  con.query(
    "insert into team (name, members) values(?,?)",
    [input.name, input.members],
    (err, result) => {
      res.send(`${input.name} 팀 추가됨`);
    }
  );
});
//수정
router.post("/update/:idx", (req, res) => {
  var user = req.headers.user;
  var input = req.body;
  //var user = req.cookies.user;
  jwt.verify(user, JWTSecret.secret, (err, decoded) => {
    if (err) {
      res.send("토큰 이상함..");
    } else {
      console.log(decoded.id);
      con.query(
        `select * from team where idx=?`,
        req.params.idx,
        (err, result) => {
          if (result[0] == null) {
            res.send("존재하지 않는 팀");
          } else {
            var r = result[0].members;
            var b = true;
            r = r.split(", ");
            for (var i = 0; i < r.length; i++) {
              if (r[i] === decoded.id) {
                b = false;
                con.query(
                  "update team set name=?, members=? where idx=?",
                  [input.name, input.members, req.params.idx],
                  (err, result) => {
                    res.send("수정 성공!");
                  }
                );
                break;
              }
            }
            if (b) {
              res.send("수정 권한 없음");
            }
          }
        }
      );
    }
  });
});
//삭제 일단은 프로젝트 없는 팀만 삭제가능
router.get("/delete/:idx", (req, res) => {
  var user = req.headers.user;
  //var user = req.cookies.user;
  jwt.verify(user, JWTSecret.secret, (err, decoded) => {
    if (err) {
      res.send("토큰 이상함..");
    } else {
      console.log(decoded.id);
      con.query(
        `select * from team where idx=?`,
        req.params.idx,
        (err, result) => {
          if (result[0] == null) {
            res.send("존재하지 않는 팀");
          } else {
            var r = result[0].members;
            var b = true;
            r = r.split(", ");
            for (var i = 0; i < r.length; i++) {
              if (r[i] === decoded.id) {
                b = false;
                con.query(
                  "delete from team where idx=?",
                  req.params.idx,
                  (err, result) => {
                    res.send("삭제 성공!");
                  }
                );
                break;
              }
            }
            if (b) {
              res.send("삭제 권한 없음");
            }
          }
        }
      );
    }
  });
});
//특정 인덱스 팀
router.get("/:idx", (req, res) => {
  con.query("select * from team where idx=?", req.params.idx, (err, result) => {
    res.json(result[0]);
  });
});

module.exports = router;
