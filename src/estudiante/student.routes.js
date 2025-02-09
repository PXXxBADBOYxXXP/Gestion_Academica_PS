import { Router } from "express";
import { registerStudentValidator, asignacion1CursoStudentValidator, eliminarPerfilEstudianteValidator} from "../middlewares/validadores.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-errors.js"
import { asignacion1CursoStudent, getStudents, registerStudent, actualizarPerfilEstuiante, eliminarPerfilEstudiante} from "./student.controller.js"

const router = Router()
//URL PARA VALIDACION DE NO MMAS DE 3 CURSOS ASIGNADOS
router.post(
    "/registerStudent",
    registerStudentValidator,
    deleteFileOnError,
    registerStudent
)
//VALIDACION ASIGNATURA DUPLICADA
router.put(
    "/asignaturaStudent/:uid",
    asignacion1CursoStudentValidator,
    deleteFileOnError,
    asignacion1CursoStudent
)
//LISTA DE ESTUDIANTES Y SUS CURSOS ASIGNADOS
router.get("/", getStudents)
//EDITAR PERFIL
router.put("/editProfile/:uid", actualizarPerfilEstuiante)
//ELIMINAR PERFIL
router.delete("/deleteProfile/:uid", eliminarPerfilEstudianteValidator, eliminarPerfilEstudiante)

export default router