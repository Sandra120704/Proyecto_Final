const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tiendaL'
});

async function testConnexion(){
  try{
    const connection = await pool.getConnection();
    console.log('Conexion exitosa a la base de datos MySql');
    connection.release();
  } catch(error){
    console.error("Error:", error);
  }
}

   testConnexion();
   module.exports = pool;