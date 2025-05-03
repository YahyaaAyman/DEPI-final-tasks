require('dotenv').config()
const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      port = process.env.PORT || 5000,
      ProductRouter = require('./routes/productRouter')

// Database Connection
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.error('Connection error:', error.message))
db.once('open', () => console.log('Database connection established successfully'))

// Middleware
app.use(express.json())

// Routes
app.use('/api/v1', ProductRouter);

// Base route
app.get('/', (req, res) => {
    res.json({
        message: 'Product API v1',
        endpoints: {
            getAll: 'GET /api/v1/products',
            getOne: 'GET /api/v1/products/:id',
            create: 'POST /api/v1/products',
            update: 'PUT /api/v1/products/:id',
            partialUpdate: 'PATCH /api/v1/products/:id',
            delete: 'DELETE /api/v1/products/:id'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});