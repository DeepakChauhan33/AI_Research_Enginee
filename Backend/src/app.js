// Import required packages

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


const app = express();

// Security middleware
app.use(helmet());


app.use(express.json());


app.use(cookieParser());


app.use(morgan("dev"));


app.use(express.urlencoded({ extended: true }));



// ==================== Routes Imports ====================

const authRoutes = require("./routes/authRoutes")







// Allow requests from the frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);




app.get('/', (req, res) => {
  res.send("Hello")
})







app.use('/user', authRoutes);






module.exports = app;

