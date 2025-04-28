const express = require('express');
const app = express();
const PORT = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.listen(PORT, () => {
  console.log(`Servidor Corriendo en http://localhost:${PORT}`);
});
