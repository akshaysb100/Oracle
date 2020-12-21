const oracledb = require('oracledb');

async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
        user: "akshay",
        password: "password123",
        connectString: "localhost:1521/ORCL"
    });
    console.log('connected to database');

     connection.execute(
      `SELECT *
       FROM employees`,
      [],  
     function(err, result) {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(result.rows);
     });
     
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();