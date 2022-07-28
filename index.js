const express   = require('express');
const app       = express();
const bodyParser= require('body-parser');
const cors      = require('cors');
const bearerToken= require('express-bearer-token');

app.use(bodyParser.json())
app.use(cors())
app.use(bearerToken())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(express.static('public'))

var port = 2022

app.get('/', (req,res) => {
    res.status(200).send(`<h1>Ini adalah API port ${port}</h1>`)
})

const {staffRouter} = require('./router')

app.use('/staff',staffRouter)


app.listen(port, () => console.log(`API aktif di port ${port}`))