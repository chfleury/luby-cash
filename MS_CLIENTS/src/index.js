const express = require('express');
// const Consumer = require('./ServiceKafka/consumer');
require('./database/index.js');

const app = express();

app.use(express.json());

app.listen(3000);

// const consumer = new Consumer();

// consumer.consume({ topic: 'new-bet', fromBeginning: false });
