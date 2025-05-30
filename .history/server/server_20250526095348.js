import express from 'express' 
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'

//Intitialize express

const app = express()

//connect to database
await connectDB()
//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req, res) => res.send("API Working"))

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`)
})