import express from 'express';
import router from './clients/router.js';
import cors from 'cors'
import morgan from 'morgan';
import { connect } from './db/mongoConfig.js';
import { config } from './config/index.js';
import { scheduleTasks } from './tasks/index.js';

//  Extract the PORT from the config object
const { PORT } = config;

// Create an express app 
const app = express();

// Middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'));

connect();  // Database connection
scheduleTasks(); // Schedule tasks

// Routes
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})