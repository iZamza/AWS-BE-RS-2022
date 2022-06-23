import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import {productsStore} from "../../../mockData/productsStore";

const awaitProductsStore = new Promise((resolve) => setTimeout(() => {resolve(productsStore)}, 1));

const getProductList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const fetchedProductsStore = await awaitProductsStore;
  return formatJSONResponse({
    message: `products are okay:)`,
    body: {
      fetchedProductsStore
    }
  });
};

export const main = middyfy(getProductList);
