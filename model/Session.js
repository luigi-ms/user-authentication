class Session{
  constructor(){
    this.sid = "";
    this.sessData = {}
  }

  get sid(){
    return this._sid;
  }

  get sessData(){
    return this._sessData;
  }

  set sid(newSID){
    this._sid = newSID;
  }

  set sessData(newSessData){
    this._sessData = newSessData;
  }
}

module.exports = Session;
