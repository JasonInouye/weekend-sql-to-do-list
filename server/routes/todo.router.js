const express = require('express');
const todoRouter = express.Router();

const pool = require('../modules/pool.js');

todoRouter.post('/', ( req,res ) => {
    const newTask = req.body;
    console.log( 'Inside of /POST', newTask);

    const queryText = `INSERT INTO "tasks" ("task","due_date","description", "priority", "completed_date")
                    VALUES ($1, $2, $3, $4, $5);`;

    const values = [newTask.task, newTask.due_date, newTask.description, 99, '1/1/2029' ]
    pool.query( queryText, values )
    .then( result => {
        res.sendStatus( 201 );
    })
    .catch( error => {
        console.log( `Error in POST`, error );
        res.sendStatus(500);
    });
});

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