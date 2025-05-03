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
        DATE_FORMAT(Libros.Fecha_P, '%Y/%m/%d') AS Fecha_P,
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

//Ruta De Crear Libros
router.get('/create', async(req, res) =>{
  try{
    const [autores] = await db.query("SELECT * FROM autores")  
    res.render('create', {autores});
  }catch(error){
    console.error(error)
  }
});

//Ruta De Crear Libros
router.post('/create', async(req, res) =>{
  try{
    const query = `
      INSERT INTO Libros (Id_Autores, Titulo, Editorial, Fecha_P, Genero, Estado) VALUES ( ?, ?, ?, ?, ?, 'disponible')
    `
    const [id] = await db.query(query, [req.body.Id_Autores, req.body.Titulo, req.body.Editorial, req.body.Fecha_P, req.body.Genero]);
    res.redirect('/');
  }catch(error){
    console.error(error)
  }
});

//Ruta De Editar Libros
router.get('/edit/:id', async(req, res) =>{
  try{
    const [datos] = await db.query("SELECT * FROM autores")
    const [registros] = await db.query("SELECT * FROM Libros WHERE Id_Libros = ?", [req.params.id])

    if(registros.length > 0)
      res.render('edit', {autores: datos, Libros: registros[0]})
      else
      res.redirect('/')
    
  }catch(error){
    console.error(error)
  }
});

//Ruta De Editar Libros
router.post('/edit', async(req, res) =>{
  try{
    const {Id_Libros,Id_Autores, Titulo, Editorial, Fecha_P, Genero} = req.body
    await db.query (
      " UPDATE Libros SET Titulo = ?, Editorial = ?, Fecha_P = ?, Genero = ? WHERE Id_Libros = ?",
      [Id_Autores,Titulo, Editorial, Fecha_P, Genero, req.params.id])
      res.redirect('/')
  }catch(error){
    console.error(error)
  }
});

//Ruta De Ver Catalogo
router.get('/catalogo', async(req, res) =>{
  try{
    const query = `
     SELECT 
        Libros.Id_Libros, 
        Libros.Titulo,
        Libros.Editorial,
        DATE_FORMAT(Libros.Fecha_P, '%Y/%m/%d') AS Fecha_P,
        Libros.Genero,
        autores.Nombre AS Autor,
        Libros.Descripcion,
        Libros.Precio,
        Libros.Estado
      FROM Libros
      INNER JOIN autores ON Libros.Id_Autores = autores.Id_Autores
      WHERE Libros.Estado = 'Disponible'
    `;
    const [Libros] = await db.query(query);
    res.render('catalogo', {Libros});
  }catch(error){
    console.error(error);
    res.status(500).send('Error al obtener los libros');
  }
});

//vender{}
router.get('/vender/:id', async(req, res) =>{
  try{
    await db.query("UPDATE Libros SET Estado = 'Vendido' WHERE Id_Libros = ?", [req.params.id])
    res.redirect('/productos')
  }catch(error){
    console.error(error)
  }
});

//Ruta De Eliminar Libros
router.get('/delete/:id', async(req, res) =>{
  try{
    await db.query("DELETE FROM Libros WHERE Id_Libros = ?", [req.params.id])
    res.redirect('/')
  }catch(error){
    console.error(error)
  }
});
module.exports = router;