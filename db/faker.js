const faker = require('faker/locale/en_US');


const randImage = faker.image.image();
const productTitle = faker.commerce.productName();
const price = faker.commerce.price();
const shippingCost = 0;


console.log(randImage, productTitle, price, shippingCost);