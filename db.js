var Connection = require('tedious').Connection
var Request = require('tedious').Request
require('dotenv').config()

var config = {
    server: 'krzysztoflive.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: process.env.USER, 
            password: process.env.PASS 
        }
    },
    options: {
        database: 'studentsdb',
        rowCollectionOnRequestCompletion: true
    }
  }

var connection = new Connection(config)
connection.on('connect', err =>{
  if (err) console.log(err)
  else console.log("connected")
})

module.exports = connection;