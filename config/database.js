const mysql = require('mysql2');

const conxion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tiendaL'
});

conxion.connect((error) => {
  if(error){
    console.error('Error al conectar la base de datos:'. error);
    return;
  }
  console.log('Conexion exitosa a la base de datos MySql');
});