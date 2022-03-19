const express = require('express');
const todoRouter = express.Router();

const pool = require('../modules/pool.js');

todoRouter.get('/', (req,res) => {
    console.log( 'Inside of /GET');
    let queryText = 'SELECT * FROM "tasks" ORDER BY "priority";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log( `error getting TASKS`, error);
        res.sendStatus(500);
    });
});


module.exports=todoRouter;