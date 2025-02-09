import { Router } from "express";
import { registrarCursosValidator } from "../middlewares/validadores.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-errors.js"
import { actualizarCursos, editarCursoAlumnoAsignado, eliminarCursos, eliminarCursosAlumnosAsignados, registrarCursos, visualizarCursos } from "./teacher.controller.js"

const router = Router()

//URL PARA CREAR CURSOS
router.post(
    "/registerCourses",
    registrarCursosValidator,
    deleteFileOnError,
    registrarCursos
)
//Editar cursos
router.put("/actualizarCursos/:uid", actualizarCursos)
//Eliminar cursos
router.delete("/eliminarCursos/:uid", eliminarCursos)
//Visualizar cursos
router.get("/visualizar", visualizarCursos)
//editar Curso a alumnos asignados
router.put("/editarCursoAA/:uid", editarCursoAlumnoAsignado)
//eliminar curso alumnos asignados de forma automatica
router.delete("/eliminarCursoAA/:uid", eliminarCursosAlumnosAsignados)

export default router