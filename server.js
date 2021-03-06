// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
const express = require(`express`);

const PORT = process.env.PORT || 8090;

const app = express();

// Serve static content for the app from the `public` directory in the application directory.
app.use(express.static(`public`));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require(`express-handlebars`);

app.engine(`handlebars`, exphbs({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);

// Import routes and give the server access to them.

app.use(require(`./controllers/confirmations/controller.js`));
app.use(require(`./controllers/burgers/controller.js`));

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log(` > Server listening on: http://localhost:` + PORT);
});
