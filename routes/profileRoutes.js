const express = require('express');
const knex = require('knex')(require("../knexfile"));
const router = express.Router();
const jwt = require('jsonwebtoken');

// authorize user token
const authorize = (req, res, next) => {

    // check if no authorization header is provided
    if (!req.headers.authorization) {
        return res.status(401).json({ success: false, message: 'This route requires authorization header' });
    }

    // check if auth token is provided but missing "Bearer "
    if (req.headers.authorization.indexOf('Bearer') === -1){
        return res.status(401).json({ success: false, message: 'This route requires Bearer token' });
    } 

    // get the token
    const authToken = req.headers.authorization.split(' ')[1];
  
    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'The token is invalid' });
        }

        req.jwtDecoded = decoded;
        next();
    });

}

router.get("/profile", authorize, async (req, res) => {
    const userProfiles = await knex 
        .select("*")
        .from("profiles")
        .where({user_name : req.jwtDecoded.userName})
    
    // if user profile does not existed
    if(userProfiles.length == 0){
        try{
            await knex('profiles')
            .insert({user_name: req.jwtDecoded.userName, hearts: 3, user_id: req.jwtDecoded.userId})
             
            const userProfiles = await knex 
            .select("*")
            .from("profiles")
            .where({user_name : req.jwtDecoded.userName})

            const userProfile = userProfiles[0]

            res.json({
                message: "Successfully create user profile", 
                userProfile});
        } catch{
            res.status(500).json({message: "Failed to set user data in database"});
        }
    } else{
        const userProfile = userProfiles[0]
        res.json({message: "Successfully fetch user profile", userProfile})
    }


})

module.exports = router;