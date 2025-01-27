'use strict';

import express from 'express';
import cors from "cors";
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';

const configureMiddlewares = (app) => {
    app.use(express.urlencoded ({ extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
}

const configurarRutas = () => {

}

export const conectarDB = async  () => {
    try {
        await dbConnection();
        console.log('Conexion  exitosa con la base de datos');
    }catch(error) {
        console.log(' Error al conectar con la base de datos', error);
    }
}
export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3000;
    await conectarDB();
    configureMiddlewares(app);
    configurarRutas(app);
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}