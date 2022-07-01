import {productsStore} from "../../../mockData/productsStore";

const { getProductList } = require('./handler');

describe('get all products', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('should return products', async () => {
    const mResponse = { status: 200, data: [...productsStore] };
    const actualValue = await getProductList();
    expect(actualValue).toEqual(mResponse);
  });
});