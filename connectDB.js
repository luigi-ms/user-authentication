const { Client } = require("pg");

const data = {
  user: "u0_a440",
  host: "localhost",
  database: "user-auth",
  password: "",
  port: 5432,
};

const cli = new Client(data);
cli.connect();

module.exports = cli;
