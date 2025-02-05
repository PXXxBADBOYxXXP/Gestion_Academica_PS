import { hash } from "argon2"
import mongoose from "mongoose"
import Student from "./student.model.js"
import { body } from "express-validator"
import { validarCampos } from "../middlewares/validar-campos.js"

export const registerStudent = async (req, res) =>{
    try{

        const data  = req.body
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        const student  = await Student.create(data);
 
        return res.status(201).json({
            message: "ESTUDIANTE HA SIDO CREADO",
            name: student.name,
            asignatura: student.asignatura
 
        })
    }catch(e){
        return res.status(500).json({
            message: "FALLO EN EL REGISTRO DEL ESTUDIANTE",
            error: e.message
        });
    }
}

export const asignacion1CursoStudent = async (req, res) => {
    const { uid } = req.params;
    const { asignatura } = req.body; 
    try {
        if (!mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).json({
                 success: false, 
                 message: 'ID no válido' });
        }
        const student = await Student.findById(uid);
        if (!student) {
            return res.status(404).json({
                 success: false, 
                 message: 'ESTUDIANTE NO ENCONTRADO' });
        }
        if (student.asignatura.includes(asignatura[0])) {
            return res.status(400).json({
                success: false,
                message: "LA ASIGNATURA YA ESTÁ ASIGNADA AL ESTUDIANTE"
            })
        }
        student.asignatura = asignatura;
        await student.save()
        return res.status(201).json({
            success: true,
            message: "Asignatura asignada correctamente",
            student
        })
    } catch (err) {
       return res.status(500).json({ 
        success: false,
        message: "ERROR AL ASIGNAR",
        error: err.message
       })
    }
 }


export const getStudents = async (req, res) =>{
    try{
        const {limite = 5, desde = 0} = req.query
        const query = {estado: true}
        const [total, students] = await Promise.all([
            Student.countDocuments(query),
            Student.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            students
        })
    }catch(err){
        return res.status(500).json({
            success: false, 
            message: "ERROR AL OBTENER LOS ESTUDIANTES Y CURSOS",
            error: err.message
        })
    }
}

export const actualizarPerfilEstuiante = async (req, res) => {
    const { uid } = req.params; 
    const { name, correo, password, asignatura } = req.body; 
    try {
        const student = await Student.findById(uid);
        if (!student) {
            return res.status(404).json({
                    message: 'Estudiante no encontrado' 
                    });
        }
        if (name) student.name = name;
        if (correo) student.correo = correo;
        if (password) student.password = password;
        if (asignatura) student.asignatura = asignatura;
        await student.save();
        const studentToReturn = student.toObject();
        delete studentToReturn.password;
        res.status(200).json({
            success: true,
            message: 'Perfil actualizado correctamente',
            student: studentToReturn
        })
    } catch (err) {
            return  res.status(500).json({ 
            success: false,
            message: "ERROR AL EDITAR EL PERFIL",
            error: err 
        });
    }
}

export const eliminarPerfilEstudiante = async (req, res) =>{
    try{
        const {uid} = req.params
        const student = await Student.findByIdAndUpdate(uid, {status:false},{new: true})
        return res.status(200).json({
            success: true,
            message: "PERFIL ELIMINADO",
            student
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "ERROR AL ELIMINAR EL PERFIL",
            error: err.message
        })
    }
}