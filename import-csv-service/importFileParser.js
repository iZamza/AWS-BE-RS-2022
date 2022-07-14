'use strict';
const AWS = require("aws-sdk");
const csv = require("csv-parser");
const BUCKET = 'import-csv-service';

module.exports.importFileParser = async (event) => {
  console.log(event);
  const s3 = new AWS.S3({ region: "us-east-1" });
  const sqs = new AWS.SQS({ region: "us-east-1" });

  for (const record of event.Records) {
    const BUCKET = record.s3.bucket.name;
    const key = record.s3.object.key;

    await new Promise((resolve) => {
      s3.getObject({
        Bucket: BUCKET,
        Key: key,
      })
        .createReadStream()
        .pipe(csv())
        .on('data', (fileData) => {
          console.log(fileData);

          sqs.sendMessage({
            QueueUrl: process.env.SQS_URL,
            MessageBody: JSON.stringify(fileData)
          }, () => {
            console.log('SQS send')
          })
        });
    });

    // const handleParseAndUpdate = async () => {
    //   await s3.copyObject({ Bucket: bucketName, Key: Key.replace("uploaded", "parsed"), CopySource: bucketName + "/" + Key }).promise();
    //   await s3.deleteObject({ Bucket: bucketName, Key }).promise();
    // };
    //
    // try {
    //   await bucket.createReadStream().pipe(csv()).on("end", handleParseAndUpdate());
    //   return {
    //     statusCode: 200, body: JSON.stringify({ message: "success" })
    //   };
    // }
    //
    // catch {
    //   return {
    //     statusCode: 500, body: JSON.stringify({ message: "error" })
    //   };
    // }
  }
};
