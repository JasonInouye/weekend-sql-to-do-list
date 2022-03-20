const express = require('express');
const todoRouter = express.Router();
const moment = require('moment');

const pool = require('../modules/pool.js');

todoRouter.post('/', ( req,res ) => {
    const newTask = req.body;
    console.log( 'Inside of /POST', newTask);

    const queryText = `INSERT INTO "tasks" ("task","due_date","description", "priority", "completed_date", "completed")
                    VALUES ($1, $2, $3, $4, $5, $6);`;

    const values = [newTask.task, newTask.due_date, newTask.description, 99, '1/1/2029', false ]
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
    
    let queryText = 'SELECT * FROM "tasks" ORDER BY "completed", "priority";';

    
    pool.query(queryText).then(result => {
        //FOR loop here for Moment
        let newRows = [];
        for (const row of result.rows) {
            let newRow = {
                id: row.id,
                task: row.task,
                priority: row.priority,
                due_date: moment(row.due_date).format('MMM-DD'),
                completed_date: moment(row.completed_date).format('MMM-DD'),
                completed: row.completed,
                description: row.description
            }
            newRows.push(newRow);
            // console.log('inside for', newRows);
            // console.log( 'inside for', result.id );
            // console.log( 'inside for', result.rows.id );
        }
        //console.log( 'does this work?', newRows );
        res.send(newRows);
        // console.log( 'is this a different log?', result.rows );
        // console.log( result.rows[3].due_date );
        // console.log( moment().format('MMM-DD') );
        
        
    })
    .catch(error => {
        console.log( `error getting TASKS`, error);
        res.sendStatus(500);
    });
});

todoRouter.put('/:id', (req, res) => {
    let id = req.params.id;
    console.log('inside put router', req.body, id);
    // res.sendStatus(200);
    const queryText = `
        UPDATE "tasks"
        SET "completed" = NOT "completed"
        WHERE "id" = $1;`;
    const values = [ req.body.id ];
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err)
            res.sendStatus(500);
        })
});

todoRouter.delete('/:id', (req,res) => {
    let id = req.params.id;
    console.log( 'need to delete', id );

    const queryText =`
        DELETE from "tasks"
        WHERE "id" = $1;`;
    const values = [id];
    pool.query( queryText, values)
        .then( result => {
            res.sendStatus(204);
        }).catch(err => {
            console.log( err) ;
            res.sendStatus(500);
        })
})


module.exports=todoRouter;