const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')

const app = express();


app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req,res) => {
    console.log("here now")
    res.send('OKY DOKY')
})


app.listen(3000);