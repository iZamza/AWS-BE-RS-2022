'use strict';
const AWS = require("aws-sdk");

module.exports.catalogBatchProcess = async (event) => {
  const products = event.Records.map(({body}) => body);
  const sns = new AWS.SNS();

  products.forEach((product) => {
    fetch('https://1prix8ara7.execute-api.us-east-1.amazonaws.com/dev/products', {
      method: 'POST',
      body: product
    }).then(() => {
      sns.publish({
        Subject: 'New product is added',
        Message: 'some',
        TopicArn: process.env.SNS_ARN
      }, () => {
        console.log('email send');
      })
    })
  })
};
