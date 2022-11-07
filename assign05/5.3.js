const express = require('express');
const {runQuery} = require('./database');

const port = 3000; 
const app = express();

app.get('/fare',async(req,res)=>{
    try{
        const {uid} = req.query;
        const sql = `select users.name, ` + 
        `Sum(Round(types.fare_rate * trains.distance / 1000,-2)) as total_fare ` +
        `from tickets ` + 
        `inner join users on tickets.user = users.id and users.id = ${uid} `+ 
        `inner join trains on tickets.train = trains.id ` + 
        `inner join types on trains.type = types.id`;
        const {name, total_fare} = (await runQuery(sql, [uid]))[0];
        return res.send(`Total fare of ${name} is ${total_fare} KRW`);
    } catch(err){
        console.error(err);
        return res.sendStatus(500);
    }
});
app.get('/train/status', async(req,res)=>{
    try{
        const {tid} = req.query;
        const sql = `select Count(*) AS occupied, types.max_seats `+
        `from tickets `+
        `inner join trains on tickets.train = trains.id and trains.id = ${tid} `+
        `inner join types on trains.type = types.id`;
        const {occupied, max_seats} = (await runQuery(sql,[tid]))[0];
        if(occupied < max_seats) return res.send(`Train ${tid} is not sold out`);
        else return res.send(`Train ${tid} is sold out`);
    }catch (err){
        console.error(err);
        return res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Running on ${port}`));