"use strict";

require('dotenv').config();

const http = require('http');
const express = require('express');
const app = express();
const routes = require('./routes');
const morgan = require('morgan');

app.use(morgan(process.env.ENV));
app.use(express.json());

app.use('/', routes);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
        message: err.message
        }
    });
});

module.exports = app;

const server = http.createServer(app);
server.listen(process.env.HOST_PORT);
