import express from 'express';
import data from './data.js';

// Creación express app. Express retorna un objeto.
const app = express();

// El metodo get tiene 2 parametros. el primero es lo que el servidor va a servir y el segundo la función que responde a este API.
app.get('/api/products', (req, res) => {
  // Envía data al fronend.
  res.send(data.products);
});

const port = process.env.PORT || 5000;
// Para que el servidor se conecte.
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
