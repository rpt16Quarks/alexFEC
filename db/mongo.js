const mongoose = require('mongoose');
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
