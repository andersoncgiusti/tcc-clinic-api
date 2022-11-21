require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const mongoose = require('mongoose');

const port = 3000;
const server = http.createServer(app);

//conection with database MongoDb
const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    // ssl: true, 
    // sslValidate: false 
};

mongoose.connect(process.env.DATABASE_STRING, options);
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Successfully connected to database'));

//server
server.listen(port, (err) => {
    if (err) {
        console.log('No server');
    } else {
        console.log('Server online url http://localhost:'+`${port}`+'/');
    }
});