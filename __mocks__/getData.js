const axios = require('axios');


class getData {
  static all(){
    return axios.get("http://localhost:3001/data").then(resp => resp.data);
  }
}

// let getData = async () => {
//   const response = await axios({
//     method: "get",
//     url: "http://localhost:3001/data"
//   })
//   return response.data
// }
module.exports = {
  getData
};