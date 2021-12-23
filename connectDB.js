const { Client, Pool } = require("pg");

const data = {
  user: "u0_a440",
  host: "localhost",
  database: "user-auth",
  password: "",
  port: 5432,
};

const pgCli = new Client(data);
const pgPool = new Pool(data);
pgCli.connect();

module.exports = { pgCli, pgPool };
