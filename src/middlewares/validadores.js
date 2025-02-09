import { body, check} from "express-validator"
import { studentExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-errors.js";

//VALIDACION PARA REGISRAR ESTUDIANTES
export const registerStudentValidator = [
    body("name").not().isEmpty().withMessage("ESTUDIANTE ES REQUERIDO"),
    body("asignatura").not().isEmpty().withMessage("ASIGNATURA ES REQUERIDA")
    .isArray({ min: 1, max: 3 }).withMessage("NO SE PUEDEN ASIGNAR MÁS DE 3 ASIGNATURAS")
        .custom((asignaturas) => {
            if (asignaturas.length > 3) {
                throw new Error("NO SE PUEDEN ASIGNAR MÁS DE 3 ASIGNATURAS");
            }
            return true;
        }),
    validarCampos
]

//VALIDACION PARA QUE UN ESTUDIANTE NO SE ASIGNE A UN CURSO YA ASIGNADO
export const asignacion1CursoStudentValidator = [
    body("name").not().isEmpty().withMessage("ESTUDIANTE ES REQUERIDO"),
    body("asignatura").not().isEmpty().withMessage("ASIGNATURA ES REQUERIDA")
    .isArray({ min: 1, max: 1 }).withMessage("SOLO PUEDE ASIGNARSE A 1 ASIGNATURA")
        .custom((asignaturas) => {
            const uniqueAsignaturas = [...new Set(asignaturas)];
            if (uniqueAsignaturas.length !== asignaturas.length) {
                throw new Error("NO SE PUEDE ASIGNAR UNA ASIGNATURA DUPLICADA");
            }
            return true
        }),
    validarCampos
]

//VALIDACION PARA QUE EL ESTUDIANTE ELIMINE EL PERFIL
export const eliminarPerfilEstudianteValidator = [
    check("uid").isMongoId().withMessage("NO ES UN ID VALIDO"),
    check("uid").custom(studentExists),
    validarCampos,
    deleteFileOnError
]

//VALIDACION PARA REGISTRAR CURSOS
export const registrarCursosValidator = [
    body("name").not().isEmpty().withMessage("TEACHER IS REQUIRED"),
    body("password").not().isEmpty().withMessage("PASSWORD IS REQUIRED"),
    body("cursos").not().isEmpty().withMessage("CURSOS IS REQUIRED"),
    validarCampos
]

//VALIDACION DEL INICIO DE SESION
export const loginValidator = [
    body("email").optional().isEmail().withMessage("INVALID EMAIL"),
    body("username").optional().isString().withMessage("IVALID USERNAME"),
    body("password").isLength({min:5}).withMessage("LA CONTRASEÑA DEBE CONTENER AL MENOS 5 CARACTERES"),
    validarCampos
]

//VALIDACION PARA REGISTRAR USUARIOS
export const registrarUsuarioValidator = [
    body("email").not().isEmpty().withMessage("EMAIL IS REQUIRED"),
    body("username").not().isEmpty().withMessage("USERNAME IS REQUIRED"),
    body("password").not().isEmpty().withMessage("PASSWORD IS REQUIRED"),
    body("role").not().isEmpty().withMessage("ROLE IS REQUIRED"),
    validarCampos
]