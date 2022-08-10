const express = require('express');
require('dotenv').config();
const axios = require('axios').default;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.all('/*', (req, res) => {
  console.log(req.params);

  res.status(200).json({yoyo: 'HAHAHA'});
})

app.listen(PORT, () => {
  console.log(`Ex at http://localhost:${PORT}`)
});