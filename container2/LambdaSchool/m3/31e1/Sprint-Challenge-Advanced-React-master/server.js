const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();
const { data } = require('./data');

app.use(bodyParser.json());

app.use(cors());

const players = data.map((player, index) => ({ ...player, id: index }));

app.get('/api/players', (req, res) => {
  res.send(players);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
