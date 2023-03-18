var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const exposeEndpoint = require('./exposeEndpoint');

const app = express();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((request, response, next) => {
    console.log('--- Middleware ---');
    next();
})
app.use('/', exposeEndpoint);

app.listen(3005, () => {
    console.log(`Server Started at ${3005}`)
})
