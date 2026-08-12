const express = require('express');
require('dotenv').config();

// ==================== Imports ====================

const connectDB = require("./config/db");
const app = require('./app')


// Connect to MongoDB
connectDB()


// Start the server

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

})