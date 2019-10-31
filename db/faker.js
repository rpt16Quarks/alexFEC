const faker = require('faker/locale/en_US');
const awsURL = require('./aws');


//if 100x async func is too slow, can use these instead & randomize it instead.
let objMap = [
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch1.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch10.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch2.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch21.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch22.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch23.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch24.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch3.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch4.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch5.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch6.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch66.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch7.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch8.jpg',
  'https://fecquarkalex.s3-us-west-1.amazonaws.com/watch9.jpg'
]

//Chewbacca plush toy = productID 1;


let fakerData = () => {
  let array = [];
  array.push(
    {"image":"https://i.ebayimg.com/thumbs/images/g/mXcAAOSwcLxYMP5g/s-l200.jpg", "productTitle":"Chewbacca w/ Sound Star Wars 15\" Plush Toy","price":20.11,"shippingCost":14.65},
    {"image":"https://i.ebayimg.com/thumbs/images/g/76IAAOSwuOJdmkra/s-l225.jpg", "productTitle":"Chewbacca Star Wars Talking Stuffed Animal Plush Wookie Doll 8\" Inches", "price":14.88, "shippingCost":0}
  )
  let xfunc = () => {
    return new Promise((resolve, reject) => {
      awsURL.then(r => {
        for (let i=0; i<9; i++) {
          let x = r[Math.floor(Math.random() * 15)]
          const productTitle = faker.commerce.productName();
          const price = Number(faker.commerce.price());
          const shippingCost = 0;
          array.push({"image":x, "productTitle":productTitle,"price":price,"shippingCost":shippingCost});
        }
        return resolve(array);
      })
      .catch(err => reject(err));
    })
  }
  return xfunc()
}

module.exports = {
  fakerData,
};
