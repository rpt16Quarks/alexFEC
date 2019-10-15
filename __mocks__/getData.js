const axios = require('axios');


class getData {
  static all(){
    return axios.get("http://localhost:3001/data").then(resp => resp.data);
  }
}

module.exports = {
  getData
};