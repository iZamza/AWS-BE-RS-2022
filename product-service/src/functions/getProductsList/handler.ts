import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const fakeArr = [{what: 'that!'}, {thi: 'hello'}];

const getProductList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Hello from getProductList!`,
    event,
    body: {
      ...fakeArr
    }
  });
};

export const main = middyfy(getProductList);
