const axios = require("axios");

const currentProduct = {
  title: 'axios-product',
  description: 'some csv-description',
  price: '20',
  count: '11'
};

axios.post('https://1prix8ara7.execute-api.us-east-1.amazonaws.com/dev/products', {
  ...currentProduct
}).then(data => {
  console.log('data', data);
}).catch(err => {
  console.log(err)
})