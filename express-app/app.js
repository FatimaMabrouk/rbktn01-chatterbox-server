const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res)=> res.send('hello worldddddddd'))

app.listen(port, ()=>{console.log('express server running at port'+port)})