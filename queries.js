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

//Localhost connection
const Pool = require('pg').Pool
const pool = new Pool({ 
  
  host: db_hostname,
  port: db_port,
  database: db_database,
  user: db_username,
  password: db_password

})

//Other attempts to connect.
/*
const { Client } = require('pg');
var fs = require('fs');
const pool = new Client({
  user: `${process.env.DB_USER}`,
  host: `${process.env.DB_HOST}`,
  database: `${process.env.DB_DATABASE}`,
  password: `${process.env.DB_PASSWORD}`,
  port: `${process.env.DB_PORT}`,
  ssl  : {
    ca : fs.readFileSync('./ca.pem')
  }
})
pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


const pg = require("pg");
const assert = require('assert');
const fs = require("fs");
const util = require('util');
const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();
*/
//VCAP_SERVICE exposure.
/*
  const vcapservices = JSON.stringify(appEnv.getServices());
  srv = JSON.parse(vcapservices);
  credentials = srv["cxahub-db-dev1"]["credentials"];

  var hostname = credentials.hostname;
  var portNo = credentials.port;
  var database = credentials.database; 
  var username = credentials.username;
  var password = credentials.password;
  var uri = credentials.uri;
  var sslcert = credentials.sslcert;
  var sslrootcert = credentials.sslrootcert;

  // This check ensures there is a services for PostgreSQL databases
//assert(!util.isUndefined(pg_services), "Must be bound to compose-for-postgresql services");

  // Within the credentials, an entry ca_certificate_base64 contains the SSL pinning key
  // We convert that from a string into a Buffer entry in an array which we use when
  // connecting.
  let caCert = new Buffer(credentials.sslcert, 'base64');
  console.log(caCert);
  let connectionString = credentials.uri;

  // We want to parse connectionString to get username, password, database name, server, port
  // So we can use those to connect to the database
  const parse = require('pg-connection-string').parse;
  let config = parse(connectionString);

  // Add some ssl
  config.ssl = {
    ca: caCert
  }

  // set up a new client using our config details
  const pool = new pg.Client(config);

  /*

    app.get('/', function (req, res) {
      res.send('VCAP SERVICE <hr/>' 
      + 'Hostname: ' + hostname+ '<br>' 
      + 'Port: ' + portNo + '<br>' 
      + 'Database: ' + database + '<br>' 
      + 'Username: ' + username + '<br>'
      + 'Password: ' + password + '<br>'
      + 'URI: ' + uri + '<br>'
      + 'SSL Cert: ' + sslcert + '<br>'
      + 'SSL Root Cert: ' + sslrootcert + '<hr/>'
      + 'VCAP_SERVICE: ' + vcapservices + '<br>'
      );
    });

    */

const getAlert = (request, response) => {
  pool.query('SELECT * FROM cxahub.t_alert ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM cxahub.t_user ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM cxahub.t_user WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { user_first_name, user_last_name } = request.body

  pool.query('INSERT INTO cxahub.t_user (user_first_name, user_last_name ) VALUES ($1, $2) RETURNING *', [user_first_name, user_last_name ], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { user_first_name, user_last_name } = request.body
  
    pool.query(
      'UPDATE cxahub.t_user SET user_first_name = $1, user_last_name = $2 WHERE id = $3',
      [user_first_name, user_last_name, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM cxahub.t_user WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
    getAlert,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }