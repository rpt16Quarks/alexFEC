const mongoose = require('mongoose');
const fakerAPI = require('./faker')
//mongoose.connect('mongodb://localhost/fecRepo', {useNewUrlParser: true});
//Need below for docker.
mongoose.connect('mongodb://ec2-54-215-211-187.us-west-1.compute.amazonaws.com:27017/', {useNewUrlParser: true})
.catch(err => console.error(err));


const db = mongoose.connection;
db.once('open', () => {console.log('open!')})


let repoSchema = mongoose.Schema({
  image: String,
  productTitle: String,
  shippingCost: Number,
  price: Number
});

let repo = mongoose.model('repos', repoSchema);


let save = (cb) => {
  let records = fakerAPI.fakerData();
  records.then(r => {
    repo.deleteMany((err, res) => {
      if (err) throw err;
      else {
        repo.insertMany(r, (err, result) => {
          if (err) throw err;
          else {
            cb(result);
          }
        })
      }
    })
  });
}

let findOne = () => {
  return new Promise((resolve, reject) => {
    repo.findOne({"productTitle": "Chewbacca w/ Sound Star Wars 15\" Plush Toy"})
    .then(r => {
      repo.findOne({"productTitle": "Chewbacca Star Wars Talking Stuffed Animal Plush Wookie Doll 8\" Inches"})
      .then(f => resolve([r,f]))
    });
  })
}


let retrieve = () => {
  return new Promise((resolve, reject) => {
    repo.find({}, (err, res) => {
      if (err) reject(err);
      else {
        resolve(res);
      }
    })
  })
}






module.exports = {
  save,
  retrieve,
  db,
  repo,
  findOne
}
