const express = require('express');
const bodyParser  =require('body-parser');
const path = require('path')
const app = express();
const PORT = 3000

app.use(express.json());

app.set('views engine', 'ejs')
app.set('index', path.join(__dirname, 'views'))

app.listen(PORT, () => {
  console.log(`Servidor Corriendo en http://localhost:${PORT}`);
});
