const webpack = require('webpack')
const slsw = require('serverless-webpack');
const BbPromise = require('bluebird');

module.exports = BbPromise.try(() => {
  return slsw.lib.serverless.providers.aws.getAccountId()
    .then(accountId => ({
      entry: './handler.js',
      target: 'node',
      plugins: [
        new webpack.DefinePlugin({
          AWS_ACCOUNT_ID: `${accountId}`,
        }),
      ],
      module: {}
    }));
});