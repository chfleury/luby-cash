const express = require('express');
const Consumer = require('./ServiceKafka/consumer');
require('./database/index.js');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);
app.listen(3000);

const consumer = new Consumer();

consumer.consume({ topic: 'new-client', fromBeginning: false });
