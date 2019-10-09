// const mocks = require("../__mocks__/axio.js")
// const realAxios = require("../__mocks__/getData.js");

const axios = require('axios');
const RealAxios = require("../__mocks__/getData.js")

jest.mock('axios')
describe("express API endpoint testing", () => {

  test('/data endpoint', async () => {

    let sampleData = {data: [
      {"_id":"5d9cf3c2766bcc4449b487ed","image":"https://fecquarkalex.s3-us-west-1.amazonaws.com/watch1.jpg","productTitle":"Incredible Frozen Mouse","price":763,"shippingCost":0,"__v":0},
      {"_id":"5d9cf3c2766bcc4449b487ee","image":"https://fecquarkalex.s3-us-west-1.amazonaws.com/watch8.jpg","productTitle":"Sleek Plastic Pants","price":269,"shippingCost":0,"__v":0},
      {"_id":"5d9cf3c2766bcc4449b487ef","image":"https://fecquarkalex.s3-us-west-1.amazonaws.com/watch24.jpg","productTitle":"Handcrafted Steel Table","price":990,"shippingCost":0,"__v":0},
      {"_id":"5d9cf3c2766bcc4449b487f0","image":"https://fecquarkalex.s3-us-west-1.amazonaws.com/watch66.jpg","productTitle":"Practical Metal Shoes","price":272,"shippingCost":0,"__v":0},
      {"_id":"5d9cf3c2766bcc4449b487f1","image":"https://fecquarkalex.s3-us-west-1.amazonaws.com/watch9.jpg","productTitle":"Incredible Fresh Pizza","price":151,"shippingCost":0,"__v":0}
    ]}

    axios.get.mockResolvedValue(sampleData);

    let data = await RealAxios.getData.all()

    expect(data).toEqual(sampleData.data);
    expect(data.length == 5).toBe(true);

  })

})