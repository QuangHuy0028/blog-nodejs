const express = require("express"); // Express
const { engine } = require("express-handlebars"); // Template Engine [Handlebars express]

const path = require("path"); // Path of the project.
const morgan = require("morgan"); // Follow changes from browser
const app = express(); // Express app
const port = 3000;

const db = require("../src/config/db"); // MongoDB database

// Connect to DB:
db.connect(); // -> console.log : successfully !

app.use(express.static(path.join(__dirname, "public"))); // path.join return __dirname/public
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.set("views", path.join(__dirname, 'resources', 'views'));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);

const route = require("./routes");

// Route Init
route(app); // will go to route when clients send a request (From browser)

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
