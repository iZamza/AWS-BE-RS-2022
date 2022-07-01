import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Client } from 'pg';

import schema from './schema';
import {envProps} from "../../constants/envProps";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = envProps;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
};

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log(event);
  const client = new Client(dbOptions);
  await client.connect();

  const id = event.pathParameters.id;

  try {
    const fetchedProductsStore = await client
      .query(`select * from products
                left join stocks on
                stocks.product_id = products.id
                where id = '${id}'`)

    const product = fetchedProductsStore.rows[0];
    await client.end();
    return formatJSONResponse({
      message: `${product ? 'success' : 'product not found'}`,
      body: {
        ...product
      }
    }, product ? 200 : 404);
  } catch (err) {
    await client.end();
    return formatJSONResponse({
      message: `error!!`,
      body: {}
    }, 500);
  };
};

export const main = middyfy(getProductsById);
