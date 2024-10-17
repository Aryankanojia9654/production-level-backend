import express from 'express'

import cookieParser from 'cookie-parser'

import cors from 'cors'

const app = express()


// app.use(cors()) // aise bhi configure ho jayega but not professional way it is kaam chalau
app.uses(cors({
    origin : process.env.CORS_ORIGIN ,
    Credential: true
}))