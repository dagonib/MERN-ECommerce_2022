import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    // Obtener el usuario a través del email. Devuelve el usuario que coincide con el email.
    const user = await User.findOne({ email: req.body.email });

    // Si el usuario existe.
    if (user) {
      // Comprobar el password coincide con el del usuario.
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // Si coincide se envía toda la información del usuario.
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }

    // Si el usuario no existe.
    res.status(401).send({ message: 'Invalid email or password ' });
  })
);

export default userRouter;
