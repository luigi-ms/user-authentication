const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const clientRouter = require("./routes/clientRouter.js");
const authRouter = require("./routes/authRouter.js");

const app = express();
const KEY_SECRET = "g4sol1n3";

app.disable("x-powered-by");
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: KEY_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: Date.now() + (1000 * 5),
      sameSite: true,
    },
    name: "sessionId",
    unset: "destroy"
  })
);
app.use(clientRouter);
app.use(authRouter);

app.listen(3000, () => {
  console.log("Express running on port 3000");
});
