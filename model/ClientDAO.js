const { pgCli } = require("../connectDB.js");
const Client = require("./Client.js");

class ClientDAO extends Client {
  constructor() {
    super();
  }

  async insert() {
    try {
      const insertion = await pgCli.query(
        "INSERT INTO Client(name, address, password, email) VALUES($1, $2, $3, $4)",
        [this.name, this.address, this.password, this.email]
      );
      const inserted = await this.selectAll();

      return (insertion)
        ? inserted
        : new Error("Error in query. Check the values you're passing");
    } catch (err) {
      return err.stack;
    }
  }

  async selectAll() {
    try {
      const selection = await pgCli.query("SELECT * FROM Client WHERE email=$1", [
        this.email,
      ]);

      return selection.rows[0];
    } catch (err) {
      return err.stack;
    }
  }

  async updateColumn(column, newValue) {
    if (!(await this.clientExists(this.email))) {
      return new Error("Client does not exists. Try sign in.");
    }

    let query = "";

    if (column === "name") {
      query = "UPDATE Client SET name=$1 WHERE email=$2";
    } else if (column === "address") {
      query = "UPDATE Client SET address=$1 WHERE email=$2";
    } else if (column === "password") {
      query = "UPDATE Client SET password=$1 WHERE email=$2";
    } else {
      throw new Error(
        column + " does not exists or you're not allowed to modify it."
      );
    }

    try {
      const updating = await pgCli.query(query, [newValue, this.email]);
      const updatedData = await this.selectAll();

      return updating
        ? updatedData
        : new Error("Error in query. Check the values you're passing.");
    } catch (err) {
      return err.stack;
    }
  }

  async deleteClient() {
    if (!(await this.clientExists(this.email))) {
      return new Error("Client does not exists. Try sign in.");
    }

    try {
      const deletion = await pgCli.query("DELETE FROM Client WHERE email=$1", [
        this.email,
      ]);
      return deletion.rows[0];
    } catch (err) {
      return err.stack;
    }
  }

  async selectCredentials() {
    if (!(await this.clientExists(this.email))) {
      return new Error("Client does not exists. Try sign in.");
    }

    try {
      const credentials = await pgCli.query(
        "SELECT email, password FROM Client WHERE email=$1",
        [this.email]
      );
      return credentials.rows[0];
    } catch (err) {
      return err.stack;
    }
  }

  async clientExists(email) {
    try {
      const founded = await pgCli.query(
        "SELECT email FROM Client WHERE email=$1",
        [email]
      );
      return founded.rows[0] ? true : false;
    } catch (err) {
      return err.stack;
    }
  }
}

module.exports = ClientDAO;
