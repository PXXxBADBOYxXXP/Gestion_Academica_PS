import { hash, verify } from "argon2"
import User from "../auth/auth.model.js"
import {generateJWT} from "../helpers/generar-jwt.js"

export const login = async (req, res) =>{
    const {email, username, password} = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })
        if(!user){
           return res.status(400).json({
            message: "CREDENCIALES INVALIDAS",
            error: "NO EXISTE EL USUARIO O CORREO INGRESADO"
           }) 
        }
        const validPassword = await verify(user.password, password)
        if(!validPassword){
            return res.status(400).json({
                message: "CREDENCIALES INVALIDAS",
                error: "CONTRASEÑA INCORRECTA"
            })
        }
        const token = await generateJWT(user.id)
        return res.status(200).json({
            message: "LOGIN SUCCESFUL",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "LOGIN FAILED, SERVER ERROR",
            error: err.message
        })

    }
}