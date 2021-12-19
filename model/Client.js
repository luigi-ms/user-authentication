class Client {
  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.address = "";
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get address() {
    return this._address;
  }

  set name(newName) {
    this._name = newName;
  }

  set email(newEmail) {
    this._email = newEmail;
  }

  set password(newPass) {
    this._password = newPass;
  }

  set address(newAddress) {
    this._address = newAddress;
  }
}

module.exports = Client;
