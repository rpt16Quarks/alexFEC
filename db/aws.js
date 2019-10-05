const aws = require('aws-sdk');
const config = require('../config.json');


module.exports = (async function () {
  try {
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: config.aws.accessKey,
      secretAccessKey: config.aws.secretKey,
    })

    let s3 = new aws.S3();
    let response = await s3.listObjectsV2({
      Bucket: "fecquarkalex",
    }).promise();

    const url = "https://fecquarkalex.s3-us-west-1.amazonaws.com/"

    let urlList = [];
    response.Contents.map(photos => {
      let photoKey = photos.Key;
      let photoURL = url+encodeURIComponent(photoKey);
      urlList.push(photoURL);
    });
    return urlList;
  }
  catch(e){
    console.error('this is error: ',e);
  }

})()

