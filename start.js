const express = require('express');
const app = express();

const fs = require('fs');
const package = fs.readFileSync('package.json')
const packageParse = JSON.parse(package)
const expressVersion = 'v' + packageParse.dependencies.express.slice(1)

const env = require('dotenv').config();

if(process.env.NODE_ENV == 'production') {

  db_hostname = process.env.PROD_DB_HOSTNAME;
  db_port = process.env.PROD_DB_PORT;
  db_database = process.env.PROD_DB_DATABASE;
  db_username = process.env.PROD_DB_USERNAME; 
  db_password = process.env.PROD_DB_PASSWORD;

} else {

  db_hostname = process.env.LOCAL_DB_HOSTNAME;
  db_port = process.env.LOCAL_DB_PORT;
  db_database = process.env.LOCAL_DB_DATABASE;
  db_username = process.env.LOCAL_DB_USERNAME; 
  db_password = process.env.LOCAL_DB_PASSWORD;

}

try {

  const db = require('./queries');

  //Routes to API's
  app.get('/users', db.getUsers);
  app.get('/users/:id', db.getUserById);
  app.post('/users', db.createUser);
  app.put('/users/:id', db.updateUser);
  app.delete('/users/:id', db.deleteUser);

} catch (e) {

  app.get('/', function (req, res) {
    res.send('An error occurred.<hr/>' + e);
  });

  console.log(e);

}

const port = process.env.PORT || 8080;
  app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});

app.get('/', function (req, res) {
  res.send('Node API App: ' + 'Express Version: ' + expressVersion + 'myapp listening on port ' + port + db_hostname);
});