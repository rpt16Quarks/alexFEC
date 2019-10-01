const express = require('express');
const path = require('path');

let dist = path.resolve('client', 'dist');

let app = express();
app.use(express.static(dist))

app.get('/', (req, res) => {
  res.status(200);
})

app.post('/', (req, res) => {
  res.status(200);
})

app.listen(1212 || process.env.PORT, () => {
  console.log('On port 1212');
});