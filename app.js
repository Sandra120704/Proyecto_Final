const express = require('express');
const bodyParser  =require('body-parser');
const path = require('path')
//const conexion = require('./config/database');
const app = express();
const router = require('./router/router');
const PORT = process.env.PORT || 3000
app.use('/', require('./router/router'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', router);



app.use(express.static('public'));



app.get('/', (req, res) => {
res.render('index', {Libros: Libros});
});

app.listen(PORT, () => {
  console.log(`Servidor Corriendo en http://localhost:${PORT}`);
});
