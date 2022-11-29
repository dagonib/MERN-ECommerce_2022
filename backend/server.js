import express from 'express';
import data from './data.js';
import datacrypto from './datacrypto.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

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

// Aquí se añaden los valores iniciales de Productos y Usuarios.
app.use('/api/seed', seedRouter);

// El metodo get tiene 2 parametros. el primero es lo que el servidor va a servir y el segundo la función que responde a este API.
app.use('/api/products', productRouter);

//Obtención de los datos de la DB datacrypto
app.get('/api/operations', (req, res) => {
  res.send(datacrypto.operations);
});

// Información del servidor y conexión a este.
const port = process.env.PORT || 5000;
// Para que el servidor se conecte.
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
