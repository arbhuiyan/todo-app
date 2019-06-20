const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Initialize DB Connection
const db = require('./database');

const cors = require('cors')
//Routers
const indexRouter = require('./routes/index');
const tasksRouter = require('./routes/task');

const app = express();
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);

module.exports = app;