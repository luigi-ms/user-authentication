const express = require("express");
const Client = require("../model/ClientActions.js");
const Session = require("../model/SessionActions.js");

const router = express.Router();

router.post("/signup", (req, res) => {
  const { name, address, email, pass } = req.body;

  Client.signIn(name, address, email, pass)
    .then((result) => res.json({ result }))
    .catch((error) => res.json({ error }));
});

router.post("/login", (req, res) => {
  const { email, pass } = req.body;

  req.session.email = email;
  req.session.passwd = pass;

  Client.validateClient(email, pass)
    .then((result) => {
      Session.createSession(req.session.id, req.session)
        .then(sess => {
          res.cookie("sessionId", sess.sid).json(result)
        })
        .catch(err => res.status(500).json({ err }));
    })
    .catch((error) => res.status(401).json({ error }));
});

router.post("/logout", (req, res) => {
  const sessionID = req.cookies.sessionId.substring(0, 32);

  Session.removeSession(sessionID)
    .then(sessionID => {
      res.clearCookie("sessionId").json({ message: "See you soon!" });
    })
    .catch(rejected => res.status(500).json({ rejected }));
});

module.exports = router;
