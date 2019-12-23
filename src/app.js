import createConnection from './db/connection';
const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
// const Pack = require('.')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });


    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: '1.0.0',
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    // const createConnection = require('./db/connection');

    createConnection()
        .then(async (connection) => {
            if (connection.isConnected) {
                console.log('DATABASE CONNECTED');

                // start the server
                await server.start();
                console.log('Server running on port 3000');

                // defining routes module
                const routes = require('../src/routes');
                await server.route(routes);

            } else {
                throw new Error('DATABASE CONNECTION FAILED.');
            }
        })

        .catch((err) => {
            console.log(`Error starting application.`);
            console.error(err);

        });
};


init();














// import express from 'express';
// import configure from './config/config';
// import createConnection from './db/connection';

// configure();
// createConnection()
//     .then(async (connection) => {
//         if (connection.isConnected) {
//             console.log('DATABASE CONNECTED');

//             const app = express();
//             const swaggerUi = require('swagger-ui-express');
//             const swaggerDocument = require('./config/swagger.json');
//             const morgan = require('morgan');
//             const cookieParser = require('cookie-parser');
//             const session = require('express-session');

//             app.use(morgan('dev'));
//             app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//             app.use(express.json());
//             app.use(cookieParser());

//             app.use(session({
//                 key: 'foo',
//                 secret: process.env.SECRET_KEY,
//                 resave: false,
//                 saveUninitialized: false,
//                 cookie: {
//                     expires: 600000
//                 }
//             }));

//             app.use(AppRouter);

//             app.listen(process.env.APP_PORT, () => {
//                 console.log(`Application ${process.env.APP_NAME} successfully started on port ${process.env.APP_PORT}.`);

//             });
//         } else {
//             throw new Error('DATABASE CONNECTION FAILED.');
//         }
//     })

//     .catch((err) => {
//         console.log(`Error starting application.`);
//         console.error(err);

//     });
