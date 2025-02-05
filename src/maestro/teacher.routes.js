import { Router } from "express";
import { registrarCursosValidator } from "../middlewares/validadores.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-errors.js"
import { actualizarCursos, editarCursoAlumnoAsignado, eliminarCursos, eliminarCursosAlumnosAsignados, registrarCursos, visualizarCursos } from "./teacher.controller.js"

const router = Router()
//RUTAS GENERALES DE LA API
/**
 * Validación máximo 3 cursos: POST
http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/registerStudent
Validación materia duplicada
http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/asignaturaStudent/IDDEMONGODB
Lista de cursos: GET
http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/
Editar perfil: PUT http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/editProfile/IDDEMONGODB
Eliminar perfil: DELETE
http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/deleteProfile/IDDEMONGODB
Crear cursos: POST
http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/registerCourses
Editar cursos: PUT
http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/actualizarCursos/67a297795c937b27534e1dc5
Eliminar cursos: 
http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/eliminarCursos/IDDEMONGODB
Visualizar cursos:
http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/visualizar
Editar curso AA:
http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/editarCursoAA/IDMONGODB
Eliminar curso AA:
http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/eliminarCursoAA/IDMONGODB

 */

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