import express from 'express';
import router from './clients/router.js';
import cors from 'cors'
import morgan from 'morgan';
import { connect } from './db/mongoConfig.js';
import { config } from './config/index.js';

//  Extract the PORT from the config object
const { PORT } = config;

// Create an express app 
const app = express();

// Middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'));

// Database connection
connect();

// Routes
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})