const express = require('express');
const path = require('path');
const {save, retrieve, findOne} = require('../db/mongo');
const axios = require('axios');
const bodyParser = require('body-parser');

let dist = path.resolve('client', 'dist');


let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(dist))

// app.get('/data', (req, res) => {
//   save(ans => {
//     retrieve().then(resu => {
//       res.send(resu).status(200);
//     })
//   })
// })

app.get('/suggested', (req, res) => {
  let prodId = req.query.prod_id
  // if (prodId == 1 && prodId != undefined){
  //   findOne()
  //     .then(r => res.send(r))
  //     .catch(err => res.status(400))
  // } else if (prodId != 1 && prodId != undefined) {
  //   retrieve().then(r => {
  //     let randPicker = Math.floor(Math.random() * r.length);
  //     res.status(200).send(r[randPicker])

  //   })
  if (prodId == 1 && prodId != undefined){
    findOne()
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => res.status(400))
  } else if (prodId != 1) {
    //If you resave it then it'll randomize positions of products each time
    save(ans => {
      retrieve().then(resu => {
        res.send(resu).status(200);
      })
    })
  } else {
    res.status(400).send('Try Again')
  }
})


app.listen(3001 || process.env.PORT, () => {
  console.log('On port 3001');
});