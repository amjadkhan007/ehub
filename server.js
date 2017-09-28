const express = require('express');

const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');

const bodyParser = require('body-parser');
var cors = require("cors");
const port = process.env.PORT || 8080;
const authentication = require('./routes/authentication')(router);

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if(err) {
    console.log('Could not Connect to database: ', err);
  }
  else {
    console.log('Connected to Database: ' + config.db);
  }
});


app.use(cors({
  origin: 'http://localhost:4200',
  allowOrigin: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/authentication', authentication);
// app.use('/blogs', blogs);
// app.get('/home', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/index.html'));
// });

app.get('/', (req, res) => {
  res.send('Hello E-Hub');
})

app.listen(port, () => {
  console.log("Listeening on port: " + port);
});