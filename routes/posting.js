const express = require("express");
var router = express.Router();
const con = require("../lib/db.js");
const JWTSecret = require("./../lib/secrets/jwt_secrets");
const jwt = require("jsonwebtoken");

//프로젝트 인덱스에 포함된 모든 포스팅 반환
router.get("/project/:idx", function (req, res) {
  con.query(
    "select * from posting where posting.project_idx=?;",
    req.params.idx,
    (err, results) => {
      res.json(results);
    }
  );
});

//포스팅 업로드
router.post("/upload", (req, res) => {
  var user = req.headers.user;
  var input = req.body;
  jwt.verify(user, JWTSecret.secret, (err, decoded) => {
    if (err) {
      res.send("토큰 손상됨..");
    } else {
      con.query(
        "insert into posting (project_idx,user_id,content,title) values(?,?,?,?)",
        [input.project_idx, decoded.id, input.content, input.title],
        (err, result) => {
          console.log(err);
          res.send("포스팅 업로드 성공");
        }
      );
    }
  });
});
//포스팅 수정 쿼리로 포스팅 인덱스 받음
router.post("/update/:idx", (req, res) => {
  var user = req.headers.user;
  var input = req.body;
  jwt.verify(user, JWTSecret.secret, (err, decoded) => {
    if (err) {
      res.send("토큰 이상함..");
    } else {
      con.query(
        "select * from posting where posting.idx=?",
        req.params.idx,
        (error, result) => {
          if (result[0] == null) {
            res.send("존재하지 않는 포스팅");
          } else {
            var writer = result[0].user_id;
            if (writer == decoded.id) {
              con.query(
                "update posting set title=?, content=? ,updateDate=now() where posting.idx=?;",
                [input.title, input.content, req.params.idx],
                (err, r) => {
                  res.send("수정 성공!");
                }
              );
            } else {
              res.send("수정 권한 없음!");
            }
          }
        }
      );
    }
  });
});
//포스팅 삭제 쿼리로 포스팅 인덱스 받음
router.get("/delete/:idx", (req, res) => {
  var user = req.headers.user;
  jwt.verify(user, JWTSecret.secret, (err, decoded) => {
    if (err) {
      res.send("토큰 이상함..");
    } else {
      con.query(
        "select * from posting where posting.idx=?",
        req.params.idx,
        (error, result) => {
          if (result[0] == null) {
            res.send("존재하지 않는 포스팅");
          } else {
            var writer = result[0].user_id;
            if (writer == decoded.id) {
              con.query(
                "delete from posting where idx=?;",
                req.params.idx,
                (err, r) => {
                  res.send("삭제 성공!");
                }
              );
            } else {
              res.send("삭제 권한 없음!");
            }
          }
        }
      );
    }
  });
});
//포스팅 인덱스 받으면 세부정보 모두 반환
router.get("/:idx", (req, res) => {
  con.query(
    "select * from posting where posting.idx=?;",
    req.params.idx,
    function (error, results) {
      res.json(results);
    }
  );
});

module.exports = router;
