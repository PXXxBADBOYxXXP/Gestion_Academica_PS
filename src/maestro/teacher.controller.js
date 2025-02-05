import { hash } from "argon2"
import mongoose from "mongoose"
import Teacher from "./teacher.model.js"



export const registrarCursos = async (req, res) =>{
    try{
        const data  = req.body
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        const teacher  = await Teacher.create(data);
 
        return res.status(201).json({
            message: "Cursos HAN SIDO CREADOS",
            name: teacher.name,
            cursos: teacher.cursos
 
        })
    }catch(e){
        return res.status(500).json({
            message: "FALLO EN EL REGISTRO DE CURSOS",
            error: e.message
        });
    }
}

export const actualizarCursos = async (req, res) => {
    const { uid } = req.params; 
    const { name, password, cursos } = req.body; 
    try {
        const teacher = await Teacher.findById(uid);
        if (!teacher) {
            return res.status(404).json({
                    message: 'Curso no encontrado' 
                    });
        }
        if (name) teacher.name = name;
        if (password) teacher.password = password;
        if (cursos) teacher.cursos = cursos;
        await teacher.save();
        const teacherToReturn = teacher.toObject();
        delete teacherToReturn.password;
        res.status(200).json({
            success: true,
            message: 'Cursos actualizado correctamente',
            teacher: teacherToReturn
        })
    } catch (err) {
            return  res.status(500).json({ 
            success: false,
            message: "ERROR AL EDITAR LOS CURSOS",
            error: err 
        });
    }
}

export const eliminarCursos = async (req, res) => {
    const { uid } = req.params;

    await Teacher.findByIdAndUpdate(uid, { estado: false });
    const teacher = await Teacher.findOne({ _id: uid });
    res.status(200).json({
        msg: 'Cursos eliminado exitosamente',
        teacher
    });
}

export const visualizarCursos = async (req, res) =>{
    try{
        const {limite = 4, desde = 0} = req.query
        const query = {estado: true}
        const [total, teachers] = await Promise.all([
            Teacher.countDocuments(query),
            Teacher.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            teachers
        })
    }catch(err){
        return res.status(500).json({
            success: false, 
            message: "ERROR AL VISUALIZAR LOS CURSOS",
            error: err.message
        })
    }
}

export const  editarCursoAlumnoAsignado = async (req, res) => {
    const { uid } = req.params; 
    const { name, password, alumnosAsignados,cursos } = req.body; 
    try {
        const teacher = await Teacher.findById(uid);
        if (!teacher) {
            return res.status(404).json({
                    message: 'Curso no asignado' 
                    });
        }
        if (name) teacher.name = name;
        if (password) teacher.password = password;
        if (alumnosAsignados) teacher.alumnosAsignados = alumnosAsignados
        if (cursos) teacher.cursos = cursos;
        await teacher.save();
        const teacherToReturn = teacher.toObject();
        delete teacherToReturn.password;
        res.status(200).json({
            success: true,
            message: 'Alumnos asignados correctamente',
            teacher: teacherToReturn
        })
    } catch (err) {
            return  res.status(500).json({ 
            success: false,
            message: "ERROR AL ASIGNAR ALUMNOS A LOS CURSOS",
            error: err 
        });
    }
}

export const eliminarCursosAlumnosAsignados = async (req, res) => {
    const { uid } = req.params;

    await Teacher.findByIdAndUpdate(uid, { estado: false });
    const teacher = await Teacher.findOne({ _id: uid });
    res.status(200).json({
        msg: 'Curso eliminado exitosamente',
        teacher
    });
}