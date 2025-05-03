const express = require('express');
const path = require('path')
const app = express();
const router = require('./router/router');
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use('/', router);


app.listen(PORT, () => {
  console.log(`Servidor Corriendo en http://localhost:${PORT}`);
});