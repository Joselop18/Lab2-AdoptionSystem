'use strict';
 
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/users/user.routes.js';
import petRoutes from '../src/pet/pet.routes.js';
 
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}
 
const router = async(app) => {
    app.use('/adoptionSystem/v1/auth', authRoutes);
    app.use("/adoptionSystem/v1/users", userRoutes);
    app.use("/adoptionSystem/v1/pets", petRoutes);
}
 
const conectarDB = async () => {
    try {
        await dbConnection();
        console.log('Conexion exitosa con la base de datos');
    } catch (error) {
        console.log('Error al conectar con la base de datos', error)
    }
}
 
export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    try {
        middlewares(app);
        conectarDB();
        authRoutes(app);
        app.listen(port);
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.log(`Server init failed: ${err}`);
    }
}