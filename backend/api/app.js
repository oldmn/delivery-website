const express = require('express');
const deliveries = require('./routes/delivery');
const users = require('./routes/user');
const products = require('./routes/product');

const app = express();
app.use(express.json());

app.use('/api/deliveries', deliveries);
app.use('/api/users', users);
app.use('/api/products', products);

// Basic healthcheck
app.get('/', (req, res) => res.send('Delivery API running'));

module.exports = app;

// Basic JSON error handler
app.use((err, req, res, _next) => {
	console.error(err);
	res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});
