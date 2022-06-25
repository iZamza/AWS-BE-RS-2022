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

const postProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const {title, description, price, count} = event.body;
  const invalidDataExist = !title || !description || +price < 0 || +count < 0;

  if (invalidDataExist) {
    return formatJSONResponse({
      message: `Invalid product data!`,
      body: {}
    }, 400);
  } else {
    const client = new Client(dbOptions);
    await client.connect();

    try {
      const postedProduct = await client
        .query(`insert into products (title, description, price) values
               ('${title}', '${description}', ${+price})
               returning id`)

      const newProductId = postedProduct.rows[0].id;
      const postedCount = await client
        .query(`insert into stocks (product_id, count) values
	          ('${newProductId}', ${+count})`)

      const res = postedCount.rows;
      await client.end();
      return formatJSONResponse({
        message: `products are okay:)`,
        body: {
          res
        }
      });
    } catch (err) {
      await client.end();
      return formatJSONResponse({
        message: `error!!`,
        body: {}
      }, 500);
    }
  }
};

export const main = middyfy(postProduct);
