import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
// import { Client } from 'pg';

import schema from './schema';
// import {envProps} from "../../constants/envProps";

// const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = envProps;

// const dbOptions = {
//   host: PG_HOST,
//   port: PG_PORT,
//   database: PG_DATABASE,
//   user: PG_USERNAME,
//   password: PG_PASSWORD,
//   ssl: {
//     rejectUnauthorized: false
//   },
//   connectionTimeoutMillis: 5000
// };

import {productsStore} from "../../../mockData/productsStore";

const awaitProductsStore = new Promise((resolve) => setTimeout(() => {resolve(productsStore)}, 1));

const getProductList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log(event);
  // TODO: RDS was removed because of money, and this is was agreed with course mentors
  const fetchedProductsStore = await awaitProductsStore;
  return formatJSONResponse({
    message: `products are okay:)`,
    body: {
      fetchedProductsStore
    }
  });

  // const client = new Client(dbOptions);
  // await client.connect();
  //
  // try {
  //   const fetchedProductsStore = await client
  //     .query(`select * from products
  //               right join stocks on
  //               stocks.product_id = products.id
  //               where stocks.count > 0`)
  //
  //   const res = fetchedProductsStore.rows;
  //   await client.end();
  //   return formatJSONResponse({
  //     message: `products are okay:)`,
  //     body: {
  //       res
  //     }
  //   });
  // } catch (err) {
  //   await client.end();
  //   return formatJSONResponse({
  //     message: `error!!`,
  //     body: {}
  //   }, 500);
  // }
};

export const main = middyfy(getProductList);
