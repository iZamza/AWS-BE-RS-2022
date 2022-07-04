// import AWS from "aws-sdk";
// const BUCKET = "import-service";
//
// const importProductsFile = async (event) => {
//   console.log(event);
//   const s3 = new AWS.S3({ region: "eu-west-1" });
//   const { name } = event.queryStringParameters;
//   const command = {
//     Bucket: BUCKET,
//     Key: `uploaded/${name}`,
//     ContentType: "text/csv",
//     Expires: 1000,
//   };
//
//   const signedUrl = s3.getSignedUrl("putObject", command);
//
//   return {
//     statusCode: 201,
//     headers: { "Access-Control-Allow-Origin": "*" },
//     body: JSON.stringify(signedUrl),
//   };
// };
//
// export default importProductsFile;