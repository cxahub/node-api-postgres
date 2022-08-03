//Establish express server and a.
const express = require('express')
const mountRoutes = require('./routes')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mountRoutes(app)

//Call package.json file for express version.
const fs = require('fs')
const package = fs.readFileSync('package.json')
const packageParse = JSON.parse(package)
const expressVersion = 'v' + packageParse.dependencies.express.slice(1)

//try {

  //Display connection port.
  const port = process.env.PORT || 8080;
  app.listen(port, function () {

    console.log('Listening on port ' + port);

  });

  //Display server version and port.
  app.get('/', function (req, res) {

    res.send('Node API App: ' 
    + 'Express Version: ' 
    + expressVersion + ' listening on port ' 
    + port);

  });
/*
} catch (e) {

  app.get('/', function (req, res) {
    res.send('An error occurred when starting the app.<hr/>' + e);
  });

}
*/