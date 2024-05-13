const express = require('express');
const router = require('./routes/routes');
const db = require('./db/connect');
const cors = require('cors');
const backend = express();

backend.use(express.json());

backend.use(cors({
    origin: 'http://localhost:3000'
}));

backend.use('/api/', router);

// ROOT ROUTE
backend.get('/', function(req, res){
    res.redirect('/api/music');
});


backend.listen(3001, function(){
    console.log("Server started");
});