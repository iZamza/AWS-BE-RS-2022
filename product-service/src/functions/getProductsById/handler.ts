import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import {IProduct, productsStore} from "../../../mockData/productsStore";

const awaitProductsStore = new Promise<IProduct[]>((resolve) => setTimeout(() => {resolve(productsStore)}, 1));

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const id = event.pathParameters.id;
  const fetchedProductsStore = await awaitProductsStore;
  const currentProduct = fetchedProductsStore.find(product => id === product.id);
  return formatJSONResponse({
    message: `${currentProduct ? 'success' : 'error'}`,
    body: {
      ...currentProduct
    }
  });
};

export const main = middyfy(getProductsById);
