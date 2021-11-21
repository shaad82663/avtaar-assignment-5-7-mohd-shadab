const app = require('./app');
const connectDB = require('./config/database');

//Setting up dotenv file for private data access.
const dotenv = require('dotenv');
dotenv.config({path : 'back-end/config/config.env'});

//connecting to db
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening Server over port ${process.env.PORT} in ${process.env.MODE_ENV} mode.`);
})

//Handling unhandled promise rejction
process.on('unhandledRejection', err => {
    console.log(`ERROR : ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection...');
    server.close(() => {
        process.exit(1);
    })
})