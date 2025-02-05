import { Schema, model } from "mongoose";

const userSchema = Schema
({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"],
    profilePicture: { type: String, default: '' },
}
})

export default model("User", userSchema)
