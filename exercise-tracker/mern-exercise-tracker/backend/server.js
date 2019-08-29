const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/**
 * Establish MongoDB connection
 */
const mongoUri = process.env.ATLAS_URI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

/**
 * Config routes
 */
const exercisesRoutes = require('./routes/exercises');
const usersRoutes = require('./routes/users');

app.use('/exercises', exercisesRoutes);
app.use('/users', usersRoutes);

/**
 * Ready to serve
 */
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
