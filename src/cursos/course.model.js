import { Schema, model } from "mongoose";

const courseSchema = Schema({
    nombrecursos: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio']
    }     
})

export default model("Course", courseSchema)