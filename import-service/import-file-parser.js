// import AWS from "aws-sdk";
// const BUCKET = "my-import-service";
// import csv from "csv-parser";
//
// const importFileParser = async (event) => {
//   console.log(event);
//   const s3 = new AWS.S3({ region: "eu-west-1" });
//   for (const record of event.Records) {
//     const Key = record.s3.object.key;
//     const bucketName = record.s3.bucket.name;
//
//     const bucket = s3.getObject({
//       Bucket: BUCKET,
//       Key
//     });
//
//     const handleParseAndUpdate = async () => {
//       await s3.copyObject({ Bucket: bucketName, Key: Key.replace("uploaded", "parsed"), CopySource: bucketName + "/" + Key }).promise();
//       await s3.deleteObject({ Bucket: bucketName, Key }).promise();
//     };
//
//     await (() => {
//       return new Promise(() => {
//         bucket.createReadStream().pipe(csv()).on("end", handleParseAndUpdate);
//       })
//     });
//   }
//   return {
//     statusCode: 200, body: JSON.stringify({ message: "success" })
//   };
// };
//
//
// export default importFileParser;