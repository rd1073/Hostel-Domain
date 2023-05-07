const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const session = require('express-session');

const { Collection1, Collection3 } = require("./mongodb");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')

app.set('view engine', 'hbs')
app.set('views', tempelatePath)


app.listen(4000, () => { 
    console.log('port connected for app.js');
})
 



