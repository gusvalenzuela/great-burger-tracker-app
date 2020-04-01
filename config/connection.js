// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var mysql = require(`mysql`)

var connection = mysql.createConnection({
  host: `localhost`,
  port: 3306,
  user: `root`,
  password: `r00t`,
  database: `burgers_db`
})

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error(`error connecting: ` + err.stack)
    return
  }
  console.log(`connected as id ` + connection.threadId + ` to database "` + connection.config.database + `"` )
})

// Export connection for our ORM to use.
module.exports = connection


