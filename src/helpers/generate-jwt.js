import jwt from "jsonwebtoken";

const generarJWT = (uid = '') =>{
    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign{
            payload,
            process.env.j0S3l0pEz,
            {
                expiresIn: '1h'
            },
            (err, token) => {
                err ? (console.log(err), reject('No se pudo generar el token')) : resolve(token);
            }
        };
    });
}