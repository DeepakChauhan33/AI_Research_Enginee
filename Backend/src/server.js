const express = require('express');
require('dotenv').config();

const connectDB = require("./config/db");



const app = express();

connectDB()


const PORT = process.env.PORT


app.get('/', (req, res) => {
  res.send("Hello, form the backend :)");
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

})