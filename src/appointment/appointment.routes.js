import { Router } from "express";
import { check } from "express-validator";
import { getAppointmemts, searchAppointment, deleteAppointment, saveAppointment } from "./appointment.controller.js";
import { existeAppointmnet } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { tieneRol } from "../middlewares/validar-roles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", getAppointmemts)

router.get(
    "/findAppointment/:id",
    [
        check("id", "id is invalid").isMongoId(),
        check("id").custom(existeAppointmnet),
        validarCampos
    ],
    searchAppointment
)

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Email is invalid').not().isEmpty(),
        check('name', 'Name is invalid').not().isEmpty(),
        validarCampos
    ],
    saveAppointment
)

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRol("ADMIN_ROLE"),
        check("id", "id is invalid").isMongoId(),
        check("id").custom(existeAppointmnet),
        validarCampos
    ],
    deleteAppointment
)

export default router;