const express = require("express");
const Client = require("../model/ClientActions.js");
const Session = require("../model/SessionActions.js");

const router = express.Router();

router.get("/getData/:email", (req, res) => {
  const { email } = req.params;
  const sessionID = req.cookies.sessionId.substring(0, 32);

  Session.get(sessionID)
    .then((sess) => {
      if (email !== sess.sessdata.email) {
        return res
          .cookie("sessionId", sess.id)
          .status(401)
          .json({ message: "Unauthorized" });
      }

      Client.getAllData(email)
        .then((data) => res.cookie("sessionId", sess.sid).json(data))
        .catch((error) => res.cookie("sessionId", sess.sid).json({ error }));
    })
    .catch((rejected) => {
      res.status(401).json({ rejected });
    });
});

router.patch("/updateClient", (req, res) => {
  const { data, newValue, email } = req.body;
  const sessionID = req.cookies.sessionId.substring(0, 32);

  Session.get(sessionID)
    .then((sess) => {
      if (email !== sess.sessdata.email) {
        return res
          .cookie("sessionId", sess.id)
          .status(401)
          .json({ message: "Unauthorized" });
      }
      Client.update(data, newValue, email)
        .then((result) => res.cookie("sessionId", sess.sid).json(result))
        .catch((error) => res.cookie("sessionId", sess.sid).json({ error }));
    })
    .catch((rejected) => res.status(401).json({ rejected }));
});

router.delete("/removeClient", (req, res) => {
  const { email } = req.body;
  const sessionID = req.cookies.sessionId.substring(0, 32);

  Session.get(sessionID)
    .then((sess) => {
      if (email !== sess.sessdata.email) {
        return res
          .cookie("sessionId", sess.id)
          .status(401)
          .json({ message: "Unauthorized" });
      }
      Client.removeClient(email)
        .then((result) => res.json({ result }))
        .catch((error) => res.json({ error }));
    })
    .catch((rejected) => res.status(401).json({ rejected }));
});

module.exports = router;
