const express = require('express');
const {engine} = require('express-handlebars');

const path = require("path");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.set('views', path.join(__dirname) + '\\resources\\views');
app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: '.hbs'
}));

const route = require('./routes');

// Route Init
route(app);

app.listen(port);
