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
    const[datos] = await db.query("SELECT * FROM autores")
    res.render('create', {autores: datos})
  }catch(error){
    console.error(error)
  }
});


//Ruta De Crear Libros
router.post('/create', async (req, res) => {
  try {
    //obtener datos de la base de datos
    const {Id_Autores, Titulo, Editorial, Fecha_P, Genero} = req.body
    //giardar los datos de la base de datos
    await db.query (`INSERT INTO Libros (Id_Autores, Titulo, Editorial, Fecha_P, Genero) VALUES (?, ?, ?, ?, ?)`, 
     [Id_Autores, Titulo, Editorial, Fecha_P, Genero])
     res.redirect('/')
  }catch(error){
    console.error(error)
  }
})



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
router.post('/edit/:id', async(req, res) =>{
  try{
    const { Id_Autores, Titulo, Editorial, Fecha_P, Genero} = req.body;
    const {id} = req.params;

    await db.query(
      "UPDATE Libros SET Id_Autores = ?, Titulo = ?, Editorial = ?, Fecha_P = ?, Genero = ? WHERE Id_Libros = ?",
      [ Id_Autores, Titulo, Editorial, Fecha_P, Genero, id ]
    );
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