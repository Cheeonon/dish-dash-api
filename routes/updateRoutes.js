const express = require('express');
const knex = require('knex')(require("../knexfile"));
const router = express.Router();

router.post('/heart', async (req, res) => {
    const {heartCount, userId} = req.body;

    // try{
        await knex('profiles')
        .update({hearts: heartCount + 1})
        .where({user_id : userId});
    
        res.json({message: "Successfully upload score"});
    // } 
    // catch{
    //     res.status(500).json({message: "Failed to set user data in database"});
    // }

    await knex
    .update
})


module.exports = router;


// UPDATE SCORES SET score = 30 WHERE user_id = 63;