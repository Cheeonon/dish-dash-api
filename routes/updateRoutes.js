const express = require('express');
const knex = require('knex')(require("../knexfile"));
const router = express.Router();

router.post('/heart', async (req, res) => {

    // get user hearts data
    const userHeartsData = await knex 
    .select("hearts", "coins")
    .from("profiles")
    .where({user_id : req.body.userId})
    const userHearts = userHeartsData[0].hearts;
    const userCoins = userHeartsData[0].coins;

    const {userId} = req.body;
    
    
    try{
        await knex('profiles')
        .where({user_id : userId})
        .update({hearts: userHearts + 1, coins: userCoins - 300});
    
        res.json({message: "Successfully upload score"});
    } 
    catch{
        res.status(500).json({message: "Failed to set user data in database"});
    }

    await knex
    .update
})

router.post('/doubleScore', async (req, res) => {

    const {userId} = req.body;

    try{
        await knex('profiles')
        .where({user_id: userId})
        .update({double_score: true});

        res.json({message: "Successfully upload score"});
    } catch{
        res.status(500).json({message: "Failed to set user data in database"});

    }
})

module.exports = router;


// UPDATE SCORES SET score = 30 WHERE user_id = 63;