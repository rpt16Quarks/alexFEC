const express = require('express');
const path = require('path');
const {save, retrieve} = require('../db/mongo');
const axios = require('axios');

let dist = path.resolve('client', 'dist');

let app = express();
app.use(express.static(dist))

app.get('/data', (req, res) => {
  // mongo.retrieve(results => {
  //   res.send(results).status(200);
  // })
  save(ans => {
    retrieve().then(resu => {
      res.send(resu).status(200);
    })
  })

})

app.post('/', (req, res) => {

})

app.listen(3001 || process.env.PORT, () => {
  console.log('On port 3001');
});
