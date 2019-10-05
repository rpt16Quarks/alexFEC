const mongoose = require('mongoose');
const fakerAPI = require('./faker')
mongoose.connect('mongodb://localhost/fecRepo', {useNewUrlParser: true});

const db = mongoose.connection;
db.once('open', () => {console.log('open!')})

let repoSchema = mongoose.Schema({
  image: String,
  productTitle: String,
  shippingCost: Number,
  price: Number
});

let repo = mongoose.model('repos', repoSchema);


let save = () => {
  let records = fakerAPI.fakerData();
  records.then(r => {
    repo.deleteMany((err, res) => {
      if (err) throw err;
      else {
        repo.insertMany(r, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            //cb(result);
          }
        })
      }
    })
  });
}

//save();

let retrieve = () => {
  repo.find((err, res) => {
    if (err) throw err;
    else console.log(res);
  })
}



save()
//retrieve();

module.exports = {
  save
}


