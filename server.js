const express = require("express");
const Client = require("./model/ClientActions.js");

const app = express();

app.use(express.json());

app.get("/getData/:email", (req, res) => {
  const id = req.params.email;

  Client.getAllData(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error }));
});

app.post("/signIn", (req, res) => {
  const { name, address, email, pass } = req.body;

  Client.signIn(name, address, email, pass)
    .then((result) => res.json(result))
    .catch((error) => res.json({ error }));
});

app.post("/login", (req, res) => {
  const { email, pass } = req.body;

  Client.login(email, pass)
    .then((result) => res.json(result))
    .catch((error) => res.json({ error }));
});

app.patch("/updateClient", (req, res) => {
  const { data, newValue, email } = req.body;

  Client.update(data, newValue, email)
    .then((result) => res.json(result))
    .catch((error) => res.json({ error }));
});

app.delete("/removeClient", (req, res) => {
  const id = req.body.email;

  Client.removeClient(id)
    .then((result) => res.json({ result }))
    .catch((error) => res.json({ error }));
});

app.listen(3000, () => console.log("Express running on port 3000"));
