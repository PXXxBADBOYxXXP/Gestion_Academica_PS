import { Schema, model } from "mongoose"

const studentSchema = Schema({
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
    asignatura: {
        type: [String]
    },
    role: {
        type: String,
        enum: ["STUDENT_ROLE"],
        default: "STUDENT_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    }
})

export default model("Student", studentSchema)