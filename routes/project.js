const express = require("express");
var router = express.Router();
const con = require("../lib/db.js");
const JWTSecret = require("./../lib/secrets/jwt_secrets");
const jwt = require("jsonwebtoken");

router.get("/", function (req, res) {
  con.query(
    "select project.idx, title, name, members, addDate from project left join team on project.team_idx=team.idx;",
    function (error, results) {
      res.json(results);
    }
  );
});

router.post("/upload", (req, res) => {
  var input = req.body;
  con.query(
    "insert into project (team_idx, title, info) values(?,?,?)",
    [input.team_idx, input.title, input.info],
    (err, result) => {
      con.query("select last_insert_id() as 'idx'", (err, result) => {
        //res.redirect(`/project/${result[0].idx}`);
        res.send("프로젝트 업로드 성공");
      });
    }
  );
});

router.post("/update/:idx", (req, res) => {
  var user = req.headers.user;
  //var user = req.cookies.user;
  var input = req.body;
  jwt.verify(user, JWTSecret.secret, (err, decoded) => {
    if (err) {
      res.send("토큰 이상함..");
    } else {
      con.query(
        "select members, team_idx from project left join team on project.team_idx=team.idx where project.idx=?",
        req.params.idx,
        (error, result) => {
          if (result[0] == null) {
            res.send("존재하지 않는 프로젝트");
          } else {
            var tm = result[0].members;
            var b = true;
            tm = tm.split(", ");
            for (var i = 0; i < tm.length; i++) {
              if (tm[i] === decoded.id) {
                b = false;
                con.query(
                  "update project set team_idx=?, title=?, info=? ,updateDate=now() where project.idx=?;",
                  [input.team_idx, input.title, input.info, req.params.idx],
                  (err, r) => {
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
router.get("/delete/:idx", (req, res) => {
  var user = req.headers.user;
  //var user = req.cookies.user;
  jwt.verify(user, JWTSecret.secret, (err, decoded) => {
    if (err) {
      res.send("토큰 이상함..");
    } else {
      con.query(
        "select members, team_idx from project left join team on project.team_idx=team.idx where project.idx=?",
        req.params.idx,
        (error, result) => {
          if (result[0] == null) {
            res.send("존재하지 않는 프로젝트");
          } else {
            var tm = result[0].members;
            var b = true;
            tm = tm.split(", ");
            for (var i = 0; i < tm.length; i++) {
              if (tm[i] === decoded.id) {
                b = false;
                con.query(
                  "delete from project where idx=?",
                  req.params.idx,
                  (err, r) => {
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
router.get("/:idx", (req, res) => {
  con.query(
    "select * from project join team on project.team_idx=team.idx where project.idx=?;",
    req.params.idx,
    function (error, results) {
      results[0].idx = req.params.idx;
      console.log(results[0].idx);
      res.json(results);
    }
  );
});

module.exports = router;
