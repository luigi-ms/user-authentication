const Session = require("./SessionDAO.js");

class SessionActions {
  static async createSession(sid, sessData) {
    const session = new Session();

    session.sid = sid;
    session.sessData = sessData;

    try {
      const creation = await session.insert();
      return Promise.resolve(creation);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async get(sid) {
    const session = new Session();

    session.sid = sid;

    try {
      const data = await session.select();
      return data ? Promise.resolve(data) : Promise.reject(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async removeSession(sid) {
    const session = new Session();

    session.sid = sid;

    try {
      const resultRemove = await session.deleteSession();
      return Promise.resolve(resultRemove);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

module.exports = SessionActions;
