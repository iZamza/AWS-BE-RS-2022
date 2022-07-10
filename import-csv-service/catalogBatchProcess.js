'use strict';
const AWS = require("aws-sdk");

module.exports.catalogBatchProcess = async (event) => {
  const products = event.Records.map(({body}) => body);
  const sns = new AWS.SNS();

  sns.publish({
    Subject: 'New product is added',
    Message: 'some',
    TopicArn: process.env.SNS_ARN
  }, () => {
    console.log('email send');
  })
};
