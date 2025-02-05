import Student from "../estudiante/student.model.js"

export const studentExists = async (uid = "") =>{
    const existe = await Student.findById(uid)
    if(!existe){
        throw new Error("NO EXISTE EL USUARIO CON EL ID PROPORCIONADO")
    }
}