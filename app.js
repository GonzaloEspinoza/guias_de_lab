'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./rutas')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid/v4');
const { format } = require('timeago.js');
const app = express()

// Settings

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/api', routes)



//middlewares
//var multer = multer({ dest: 'public/upload/'})

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));

app.use((req, res, next) => {
    app.locals.format = format;
    next();
});
app.use(require('./rutas/index'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app

