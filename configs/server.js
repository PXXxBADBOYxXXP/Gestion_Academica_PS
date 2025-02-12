"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import {dbConnection} from "./mongo.js"
import studentroutes from "../src/estudiante/student.routes.js"
import teacherroutes from "../src/maestro/teacher.routes.js"
import authroutes from "../src/auth/auth.routes.js"
import apiLimiter from "../src/middlewares/validar-cantidad-peticiones.js"

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}
//RUTAS GENERALES DE LA API
/**
 * Validación máximo 3 cursos: 
 * METODO: POST
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/registerStudent
Validación materia duplicada
METODO: PUT
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/asignaturaStudent/IDDEMONGODB
Lista de cursos: 
METODO:GET
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/
Editar perfil: 
METODO: PUT 
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/editProfile/IDDEMONGODB
Eliminar perfil: 
METODO: DELETE
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/student/deleteProfile/IDDEMONGODB
Crear cursos: 
METODO: POST
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/registerCourses
Editar cursos: 
METODO: PUT
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/actualizarCursos/67a297795c937b27534e1dc5
Eliminar cursos: 
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/eliminarCursos/IDDEMONGODB
Visualizar cursos:
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/visualizar
Editar curso AA:
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/editarCursoAA/IDMONGODB
Eliminar curso AA:
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/teacher/eliminarCursoAA/IDMONGODB
Registrar usuarios
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/auth/registrarUsuario
Login
URL DEL ENDPOINT: http://127.0.0.1:3001/sistemaGestionAcademica/v1/auth/login
 */
const routes = (app) =>{
    app.use("/sistemaGestionAcademica/v1/student", studentroutes)
    app.use("/sistemaGestionAcademica/v1/teacher", teacherroutes)
    app.use("/sistemaGestionAcademica/v1/auth", authroutes)
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(e){
        console.log(`DATABASE CONNECTION FAILED: ${e}`)
        process.exit(1)    
    }
}

export const inicioServidor = () =>{
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`SERVER CORRIENDO EN EL PUERTO ${process.env.PORT}`)
    }catch(err){
        console.log(`FALLO INICIO DEL SERVIDOR: ${err}`) 
    }
}
