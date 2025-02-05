import { Router } from "express";
import {login, registrarUsuario} from "./auth.controller.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-errors.js";
import { loginValidator, registrarUsuarioValidator } from "../middlewares/validadores.js";

const router = Router()

router.post(
    "/registrarUsuario",
    registrarUsuarioValidator,
    deleteFileOnError,
    registrarUsuario
)
router.post(
    "/login",
    loginValidator,
    deleteFileOnError,
    login
)

export default router