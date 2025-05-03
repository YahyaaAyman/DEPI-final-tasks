// environment variables
require("dotenv").config();

// app dependencies
const express = require("express");
const app = express();
const port = process.env.PORT;
const expressEjsLayout = require("express-ejs-layouts");

// static middleware
app.use(express.static("public"));

// set view engine
app.set("layout", "layout"); // Specify your layout file
app.use(expressEjsLayout);
app.set("view engine", "ejs");

// set app routes
app.use(require("./routes/routes"));

// running app server
app.listen(port, () =>
  console.log(`Server is running ... on localhost:${port}`)
);
