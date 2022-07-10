'use strict';
const AWS = require("aws-sdk");
const BUCKET = 'import-csv-service';

module.exports.importProductsFile = async (event) => {
  console.log(event);
  const s3 = new AWS.S3({ region: "us-east-1" });
  const { name } = event.queryStringParameters;

  const command = {
    Bucket: BUCKET,
    Key: `uploaded/${name}`,
    ContentType: "text/csv",
    Expires: 1000,
  };

  const signedUrl = s3.getSignedUrl("putObject", command);

  return {
    statusCode: 201,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(signedUrl),
  };
};
