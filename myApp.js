// Load environment variables from .env file
require('dotenv').config();

const express = require('express'); // Import Express
const app = express(); // Create an Express app

// Logger middleware: logs method, path, and IP of every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`); // Log method, path, and IP
  next(); // Pass control to the next handler
});

// Middleware for /now route to add current time to req.time
app.get('/now', (req, res, next) => {
  req.time = new Date().toString(); // Add the current time to req.time
  next(); // Move to the next handler
}, (req, res) => {
  res.json({ time: req.time }); // Respond with the time stored in req.time
});

// Serve JSON object for GET requests to the /json route
app.get('/json', function(req, res) {
  const message = "Hello json";
  
  // If MESSAGE_STYLE is uppercase, transform message to uppercase
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ message: message.toUpperCase() }); // Convert message to uppercase
  } else {
    res.json({ message: message }); // Send original message
  }
});

// Respond to GET requests to '/' with the index.html file
app.get('/', function(req, res) {
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

// Export the app object so it can be used in server.js
module.exports = app;
