const oracledb = require('oracledb');

async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
        user: "akshay",
        password: "password123",
        connectString: "localhost:1521/ORCL"
    });
    console.log('connected to database');

    const sql = `INSERT INTO employees
                 (ID, NAME, ROLE, SALARY, ADDRESS) 
                 VALUES 
                 (:employeeId, :employeeName, :employeeRole, :employeeSalary, :employeeAddress )`;

    const data = [
      { "employeeId": 6, "employeeName": "Akshay", "employeeRole": "Dev", "employeeSalary": "45000", "employeeAddress": "A/P Mahabaleshwar" },
      { "employeeId": 5, "employeeName": "Pravin", "employeeRole": "QA", "employeeSalary": "45000", "employeeAddress": "Pune"}, 
      { "employeeId": 7, "employeeName": "Aniket", "employeeRole": "QA", "employeeSalary": "45000", "employeeAddress": "A/P Mahabaleshwar"}, 
      { "employeeId": 10, "employeeName": "Vishal", "employeeRole": "Dev", "employeeSalary": "45000", "employeeAddress": "Pune"}
    ];

    const options = {
      autoCommit: true,
      bindDefs: {
        employeeId: { type: oracledb.NUMBER },
        employeeName: { type: oracledb.STRING, maxSize: 50 },
        employeeRole: { type: oracledb.STRING, maxSize: 100 },
        employeeSalary: { type: oracledb.STRING, maxSize: 200 },
        employeeAddress: { type: oracledb.STRING, maxSize: 100 }
      }
    };
    let result = await connection.executeMany(sql, data, options);
    console.log(result);
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