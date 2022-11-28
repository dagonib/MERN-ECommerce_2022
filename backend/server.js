import express from 'express';
import data from './data.js';
import datacrypto from './datacrypto.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

// Creación express app. Express retorna un objeto.
const app = express();

// El metodo get tiene 2 parametros. el primero es lo que el servidor va a servir y el segundo la función que responde a este API.
app.get('/api/products', (req, res) => {
  // Envía data al fronend.
  res.send(data.products);
});

//Obtención de los datos de la DB datacrypto
app.get('/api/operations', (req, res) => {
  res.send(datacrypto.operations);
});

//URL del backend para acceder a la información de un producto.
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    // Envía data al fronend.
    res.send(product);
  } else {
    // Aquí se ponen los mensaje de error.
    res.status(404).send({ message: 'Product Not Found' });
  }
});

//URL del backend para obtener un producto en función del id.
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    // Envía data al fronend.
    res.send(product);
  } else {
    // Aquí se ponen los mensaje de error.
    res.status(404).send({ message: 'Product Not Found' });
  }
});

// Información del servidor y conexión a este.
const port = process.env.PORT || 5000;
// Para que el servidor se conecte.
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
