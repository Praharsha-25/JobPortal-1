import express from 'express' 
import cors from 'cors'
import 'dotenv/config'

//Intitialize express

const app = express()

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