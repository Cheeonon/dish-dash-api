// import express
const express = require('express');
const app = express();

// import packages
const knex = require('knex')(require("./knexfile"));
const cors = require('cors');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// define variables
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());


// sign up
app.post("/sign-up", async (req, res) => {
    const { userName, password } = req.body;

    // Check if both name and password fields filled
    if(!userName || !password){
        return res.status(400).json({error: "Fill name and password fields"})
    }
    
    const users = await knex
        .select("user_name")
        .from("users")
    
    // Check if the username already exists
    const userExists = users.find(user => user.user_name == userName)
    
    if (userExists){
        return res.status(409).json({message: "User already exists"})
    }

    try{
        await knex('users')
        .insert({user_name: userName, password: password})
    
        res.json({message: "Successfully signed up"});
    } catch{
        res.status(500).json({message: "Failed to set user data in database"});
    }
    
})

// log in
app.post("/login", async (req, res) => {
    const { userName, password } = req.body;

    // Check if both name and password fields filled
    if(!userName || !password){
        return res.status(400).json({error: "Fill name and password fields"})
    }

    const foundUsers = await knex   
    .select("*")
    .from("users")
    .where({ user_name: userName})

    // Check if the user exists
    if (foundUsers.length != 1){
        return res.status(403).json({ message: 'User not found' });
    } 

    const user = foundUsers[0];

    // Check if password matches
    if(user.password != password){
        return res.status(403).json({ message: 'Password does not match' });
    }

    const token = jwt.sign({userId : user.user_name}, process.env.JWT_SECRET_KEY);

    res.json( {
        message: "Successfully logged in",
        token
    } );
    
})


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})
