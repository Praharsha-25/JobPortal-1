import express from 'express' 
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import './config/instrument.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'


//Intitialize express 
const app = express()

//connect to database
await connectDB()
await connectCloudinary()


//Middlewares
app.use(cors({
  origin: 'https://job-portal-1-client.vercel.app', // your frontend domain
  credentials: true
}));
app.use('/webhooks', express.raw({ type: 'application/json' }));
app.use(express.json()); // keep this after raw
app.use(clerkMiddleware());

//Routes
app.get('/', (req, res) => res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users', userRoutes)

//Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`)
})