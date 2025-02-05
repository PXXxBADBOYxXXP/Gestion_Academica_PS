"use strict"

import mongoose from "mongoose"

export const dbConnection = async () => {
    try{
        mongoose.connection.on("error", ()=> {
            console.log("MONGODB| COULD NOT BE CONNECT TO MONGODB")
            mongoose.disconnect()
        })
        mongoose.connection.on("CONNECTING", () =>{
            console.log("MONGODB | TRY CONNECTING")
        })
        mongoose.connection.on("CONNECTED", ()=>{
            console.log("MONGODB| CONNECTED TO MONGO DB")
        })
        mongoose.connection.on("OPEN", () =>{
            console.log("MONGODB | CONNECTED TO DATABASE")
        })
        mongoose.connection.on("RECONNECTED", () =>{
            console.log("MONGODB| RECONNECTED TO MONGODB")
        })
        mongoose.connection.on("DISCONNECTED", () =>{
            console.log("MONGODB| DISCONNECTED TO MONGODB")
        })

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })
    }catch(e){
        console.log(`DATABASE CONNECTION FAILED ${e}`)
    }
}