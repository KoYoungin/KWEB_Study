const express = require('express');

const port = 3000;
const app = express();

app.get('/board/page/:page',(req,res) => {
    const page = req.params.page;
    res.send(`This is page #${page}`);
});

app.listen(port, () => console.log('Running'));