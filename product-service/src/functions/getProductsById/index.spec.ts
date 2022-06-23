const { getProductsById } = require('./handler');

describe('get products by id', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('should return products', async () => {
    const mResponse = { status: 200, data: {
        id: "1",
        title: 'FIRST',
        description: 'some description first',
        price: 100
      } };
    const mEvent = { id: 1 };
    const actualValue = await getProductsById(mEvent);
    expect(actualValue).toEqual(mResponse);
  });
});