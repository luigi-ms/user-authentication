const { pgPool } = require('../connectDB.js');
const Session = require('./Session.js');

class SessionDAO extends Session{
  constructor(){
    super();
  }

  async insert(){
    const client = await pgPool.connect();
    try{
      const insertion = await client.query("INSERT INTO Session(sid, sessData) VALUES($1, $2)",
      [this.sid, this.sessData]);
      const newSession = await this.select();

      return (insertion) 
        ? newSession
        : new Error("Error parsing query");
    }catch(err){
      return err.stack;
    }finally{
      client.release();
    }
  }

  async select(){
    try{
      const selection = await pgPool.query("SELECT * FROM Session WHERE sid=$1",
      [this.sid]);

      return selection.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteSession(){
    const client = await pgPool.connect();
    try{
      const deletion = await client.query("DELETE FROM Session WHERE sid=$1",
      [this.sid]);
      return deletion.rows[0];
    }catch(err){
      return err.stack;
    }finally{
      client.release();
    }
  }
}

module.exports = SessionDAO;
