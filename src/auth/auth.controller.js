import { hash, verify } from "argon2"
import User from "../auth/auth.model.js"
import {generateJWT} from "../helpers/generar-jwt.js"

//FUNCION PARA REGISTRAR A LOS USUARIOS
export const registrarUsuario = async (req, res) =>{
    try{

        const data  = req.body
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        const user  = await User.create(data);
 
        return res.status(201).json({
            message: "USUARIO HA SIDO CREADO",
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role
 
        })
    }catch(err){
        return res.status(500).json({
            message: "FALLO EN EL REGISTRO DEL USUARIO",
            error: err.message
        });
    }
}

//FUNCION LOGIN PARA INICIAR SESION
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
            message: "LOGIN COMPLETADO",
            userDetails: {
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "LOGIN FAILED, SERVER ERROR",
            error: err.message
        })

    }
}