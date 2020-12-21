const oracledb = require('oracledb');

async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
        user: "akshay",
        password: "password123",
        connectString: "localhost:1521/ORCL"
    });
    console.log('connected to database');
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();