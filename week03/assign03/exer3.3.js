const express = require('express');

const port = 3000; 
const app = express();

app.get('/factorial/:number',(req,res) => {
    const number = req.params.number;
    const changeNum = parseInt(number,10);
    let f = 1;
    for(let i=1;i<changeNum;i++) f *= i;
    res.send(`${f}`);
});
app.get('/factorial',(req,res)=>{
    const { number } = req.query;
    return res.redirect(`/factorial/${number}`);
})


app.listen(port, () => console.log('Running'));