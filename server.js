// import express
const express = require('express');
const app = express();

// import packages
const cors = require('cors');
require("dotenv").config();

// define variables
const PORT = process.env.PORT || 8080;
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const updateRoutes = require('./routes/updateRoutes');

// middlewares
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/update', updateRoutes);


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})
