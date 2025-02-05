import { Schema, model } from "mongoose"

const teacherSchema = Schema({
    name:{
        type: String,
        required:[true, "NOMBRE ES OBLIGATORIO"],
        maxLength: [25, "NOMBRE NO PUEDE EXCEDER DE 25 CARACTERES"]
    },
    correo: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'EL PASSWORD ES OBLIGATORIO']
    },
    cursos: {
        type: [String]
    },
    alumnosAsignados: {
        type: String
    },
    role: {
        type: String,
        enum: ["TEACHER_ROLE"],
        default: "TEACHER_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    }
})

export default model("Teacher", teacherSchema)