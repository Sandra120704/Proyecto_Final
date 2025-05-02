const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/', async(req, res) =>{
  try{
    const query = `
     SELECT 
	     Libros.Id_Libros, 
        Libros.Titulo,
        Libros.Editorial, 
        Libros.Fecha_P, 
        Libros.Genero, 
        autores.Nombre AS Autor
      FROM Libros
        INNER JOIN autores ON Libros.Id_Autores = autores.Id_Autores
   `
    const [Libros] = await db.query(query);
    res.render('index', {Libros});
  }catch(error){
    console.error(error)
  }
});

module.exports = router