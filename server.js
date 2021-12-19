const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Client = require("./model/ClientActions.js");

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: "gasol1ne",
  saveUninitialized: true,
  cookie: { maxAge: (1000 * 60) },
  resave: true
}));

let globalSession;

app.get("/getData/:email", (req, res) => {
  const id = req.params.email;

  Client.getAllData(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error }));
});

app.post("/signIn", (req, res) => {
  const { name, address, email, pass } = req.body;
  
  globalSession = req.session;

  if(globalSession.sessionid === email){
    let status = { status: "Hello" };
  }else{
    let status = { status: "Who are you?" }
  }
  
  Client.signIn(name, address, email, pass)
    .then((result) => res.json({ result, status }))
    .catch((error) => res.json({ error }));
});

app.post("/login", (req, res) => {
  const { email, pass } = req.body;
  globalSession = req.session;

  globalSession.sessionID = email;

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
