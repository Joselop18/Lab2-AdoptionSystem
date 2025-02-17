import { Router } from "express";
import { check } from "express-validator";
import { savePet, getPets, searchPet, deletePet, updatePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js'
import { uploadPetPicture } from "../middlewares/multer-upload.js";
import { existePetById } from "../helpers/db-validator.js";
import { tieneRol } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Email is invalid').not().isEmpty(),
        validarCampos
    ],
    savePet
)

router.get("/",getPets)

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "ID is not valid").isMongoId(),
        validarCampos
    ],
    searchPet
)

router.put(
    "/:id",
    uploadPetPicture.single('petPicture'),
    [
        check("id", "ID is not valid").isMongoId(),
        check("id").custom(existePetById),
        validarCampos
    ],
    updatePet
)

router.delete(
    '/:id',
    [
        validarJWT,
        tieneRol("ADMIN_ROLE"),
        check("id", "ID is invalid").isMongoId(),
        validarCampos
    ],
    deletePet
)

export default router;