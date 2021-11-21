const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors');

const users = require('./routes/user');
const items = require('./routes/items');
const bookings = require('./routes/booking');

app.use(express.json());

app.use('/api/v1', users);
app.use('/api/v1', items);
app.use('/api/v1', bookings);

app.use(errorMiddleware);

module.exports = app;