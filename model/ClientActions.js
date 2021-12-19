const Client = require("./ClientDAO.js");

class ClientActions {
  static async signIn(name, address, email, password) {
    if(!this.areStrings([name, address, email, password])){
      return Promise.reject("Not a string");
    }

    const cli = new Client();

    cli.name = name;
    cli.address = address;
    cli.email = email;
    cli.password = password;

    try {
      const creation = await cli.insert();
      return Promise.resolve(creation);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllData(email) {
    if(!this.areStrings([email])){
      return Promise.reject("Not a string");
    }

    const cli = new Client();

    cli.email = email;

    const data = await cli.selectAll();
    return data ? Promise.resolve(data) : Promise.reject(data);
  }

  static async update(data, newValue, email) {
    if(!this.areStrings([data, newValue, email])){
      return Promise.reject("Not a string");
    }

    const cli = new Client();

    cli.email = email;

    try {
      const updateResult = await cli.updateColumn(data, newValue);
      return Promise.resolve(updateResult);
    } catch (err) {
      console.log(err);
      return Promise.reject(err.message);
    }
  }

  static async removeClient(email) {
    if(!this.areStrings([email])){
      return Promise.reject("Not a string");
    }

    const cli = new Client();

    cli.email = email;

    try {
      const removeResult = await cli.deleteClient();
      return Promise.resolve(removeResult);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async login(email, password) {
    if(!this.areStrings([email, password])){
      return Promise.reject("Not a string");
    }

    const cli = new Client();

    cli.email = email;
    cli.password = password;

    try {
      const loginResult = await cli.login(email);
      return Promise.resolve(loginResult);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static areStrings(values){
    for(let value of values){
      if(typeof value !== "string"){
        return false;
      }
    }

    return true;
  }
}

module.exports = ClientActions;
