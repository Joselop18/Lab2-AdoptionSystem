import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.contoller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existenteEmail, esRoleValido } from "../helpers/db-validator.js";
 
const router = Router();
 
router.post(
    '/login',
    [
        check('correo', 'Este no es un correo valido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);
 
router.post(
    '/register',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6}),
        check('correo', 'Es no es un correo valido').isEmail(),
        check('correo').custom(existenteEmail),
        check('role').custom(esRoleValido),
        check('phone', 'El telefono debe tener 8 numeros').isLength({ min: 8, max: 8}),
    ],
    register
);
 
export default router;