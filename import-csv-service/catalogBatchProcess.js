'use strict';
const AWS = require("aws-sdk");
const axios = require('axios')

module.exports.catalogBatchProcess = (event) => {
  console.log('event', event);
  const products = event.Records.map(({body}) => body);
  console.log('products', products);
  const sns = new AWS.SNS();

  products.forEach((product) => {
    const currentProduct = JSON.parse(product);
    console.log('currentProduct', currentProduct);

    axios.post('https://1prix8ara7.execute-api.us-east-1.amazonaws.com/dev/products', {
      ...currentProduct
    }).then(data => {
      console.log('send!', data);
      sns.publish({
        Subject: 'New product is added',
        Message: 'success',
        TopicArn: process.env.SNS_ARN
      }, () => {
        console.log('email send');
      })
    }).catch(err => {
      console.log(err)
    })
  })
};
