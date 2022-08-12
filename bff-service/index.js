const express = require('express');
require('dotenv').config();
const axios = require('axios').default;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.all('/*', (req, res) => {
  const paramsArr = req.originalUrl.split('/')
  const recipient = paramsArr[1];
  const restParamsString = paramsArr.slice(2, paramsArr.length).join('/');

  const recipientURL = process.env[recipient];
  if (recipientURL) {
    const axiosConfig = {
      method: req.method,
      url: `${recipientURL}${restParamsString && '/' + restParamsString}`,
      ...(Object.keys(req.body || {}).length > 0 && { data: req.body })
    };

    axios(axiosConfig)
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error => {
        if (error.response) {
          const { status, data } = error.response;

          res.status(status).json(data);
        } else {
          res.status(500).json({ error: error.message });
        }
      })
  } else {
    res.status(502).json({ error: 'Cannot process request' })
  }
})

app.listen(PORT, () => {
  console.log(`active port is http://localhost:${PORT}`)
});