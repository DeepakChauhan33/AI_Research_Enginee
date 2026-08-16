// Import required packages

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


const app = express();

require('dotenv').config();

// Security middleware
app.use(helmet());


app.use(express.json());


app.use(cookieParser());


app.use(morgan("dev"));


app.use(express.urlencoded({ extended: true }));



// ==================== Routes Imports ====================

const authRoutes = require("./routes/authRoutes");
const researchRoutes = require("./routes/researchRoutes");
const aiRoutes = require("./routes/aiRoutes");







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






// Auth Routes
app.use('/user', authRoutes);

// Research Routes
app.use('/research', researchRoutes)

// AI Routes
app.use('/ai', aiRoutes)





module.exports = app;

