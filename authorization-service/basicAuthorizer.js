'use strict';

module.exports.basicAuthorizer = async (event) => {
  const AuthToken = event.authorizationToken;
  console.log(AuthToken);
  if (!AuthToken) {
    return {
      statusCode: 401,
      body: JSON.stringify(
        {
          message: 'You need a token:)'
        }
      ),
    };
  } else {
    const tokenPart = AuthToken.split(' ')[1];
    console.log('tokenPart', tokenPart);
    const decodedToken = Buffer.from(tokenPart, 'base64').toString('utf-8').split('%3A');
    console.log('decodedToken', decodedToken);
    const envLogin = process.env.TEST_LOGIN;
    const envPassword = process.env.TEST_PASSWORD;

    if (decodedToken[0] === envLogin && decodedToken[1] === envPassword) {
      return {
        principalId: envLogin,
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api: Invoke',
              Effect: 'Allow',
              Resource: event.methodArn
            }
          ]
        }
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify(
          {
            message: 'Access denied, man!',
          }
        ),
      };
    }
  }
};