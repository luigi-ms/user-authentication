const { Client, Pool } = require("pg");

const data = {
  user: "user",
  host: "localhost",
  database: "user-auth",
  password: "password",
  port: 5432,
};

const pgCli = new Client(data);
const pgPool = new Pool(data);
pgCli.connect();

module.exports = { pgCli, pgPool };
