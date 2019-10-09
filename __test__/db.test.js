const aws = require('../db/aws.js');
const faker = require('../db/faker.js');
const mongo = require('../db/mongo.js');
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');


describe('aws.js', () => {
  test('AWS anonymous function does retrieve 15 photos and is from s3 fecquarkalex', () => {
    return aws.then(data => {
      expect(data.length).toBe(15);
      expect(data[0]).toMatch(new RegExp('https://fecquarkalex.s3-us-west-1.amazonaws.com'));
    })
  })
})


describe('faker.js', () => {

  test('It is an array with 5 objects inside', () => {
    return faker.fakerData(data => {
      expect(typeof data === 'object');
      expect(Array.isArray(data[0])).toBe(true);
    })
  })

  test('Object has correct keys value pairs.', () => {
    return faker.fakerData(data => {
      let sample = data[0];
      expect(Object.keys(sample)).toContain('image')
      expect(typeof sample.image === 'string').toBe(true);
      expect(Object.keys(sample)).toContain('productTitle')
      expect(typeof sample.productTitle === 'string').toBe(true);
      expect(Object.keys(sample)).toContain('price')
      expect(typeof sample.price === 'number').toBe(true);
      expect(Object.keys(sample)).toContain('shippingCost')
      expect(typeof sample.shippingCost === 'number').toBe(true);
    })
  })

})

describe('mongo.js', () => {

  mongoose.connect('mongodb://localhost/fecRepo', {useNewUrlParser: true});
  let db = mongo.db;
  let repo = mongo.repo;

    //Will have to refactor this.
    it ('mongo.retrieve should find records that were inserted', async () => {
      await mongo.del();
      await mongo.insertOne();
      return await mongo.retrieve()
      .then(res => {
        expect(res.length === 2).toBe(true);
        mongo.del()
      });
    })


    it('mongo.save should save 5 records',async () => {
      //const repo = db.collection('repo');
      return mongo.save(async result => {
        await repo.find({}, (err, res) => {
          expect(JSON.stringify(result) == JSON.stringify(res)).toBe(true);
        })
      })
    })

})