import mongoose, { connect } from 'mongoose'
import { DB_NAME } from './constants.js';
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import express from 'express'

const app = express()

dotenv.config();

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running at port :  ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Error occured :" , err)
})



// (async () => {
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on("error" , (error) => {
//         console.log("ERR :" , error)
//         throw error
//       }) // this app.on we are using if the database is connected but app is not able to connect , best practice professionl code practice
//       app.listen(process.env.PORT , () => {
//         console.log(`app is running at: ${process.env.PORT}`)
//       })

//     }
//     catch(error){
//         console.log("ERROR" , error)
//         throw error

//     }


// })()