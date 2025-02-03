import { Router } from "express";
import { login, register } from "./auth.contoller.js";
import { registerValidator, loginValidator } from '../middlewares/validator.js';
import { uploadProfilePicture } from "../middlewares/multer-upload.js";
import { deleteFileOnError } from "../middlewares/deletefileOnError.js";

const router = Router();

router.post(
    '/login',
    loginValidator,
    login
);

router.post(
    '/register',
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    deleteFileOnError,
    register
);

export default router;