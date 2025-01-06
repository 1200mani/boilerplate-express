// Load environment variables from .env file
require('dotenv').config();

const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Import body-parser
const app = express(); // Create an Express app

// Use body-parser middleware to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: false })); // Handle URL-encoded form data

// Logger middleware: logs method, path, and IP of every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`); // Log method, path, and IP
  next(); // Pass control to the next handler
});

// Route for GET and POST requests to /name
app.route('/name')
  // Handle GET requests
  .get((req, res) => {
    const { first, last } = req.query; // Extract 'first' and 'last' from the query string
    if (first && last) {
      res.json({ name: `${first} ${last}` }); // Respond with JSON object { name: 'firstname lastname' }
    } else {
      res.status(400).json({ error: "Missing 'first' or 'last' query parameters" }); // Handle missing parameters
    }
  })
  
  // Handle POST requests
  .post((req, res) => {
    const { first, last } = req.body; // Extract 'first' and 'last' from the request body
    if (first && last) {
      res.json({ name: `${first} ${last}` }); // Respond with JSON object { name: 'firstname lastname' }
    } else {
      res.status(400).json({ error: "Missing 'first' or 'last' in the request body" }); // Handle missing data
    }
  });

// Export the app object so it can be used in server.js
module.exports = app;
