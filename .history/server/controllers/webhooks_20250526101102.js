import { Webhook } from "svix";
import User from "../models/User.js";

//API Controller function to manage clerk user with database
export const clerkWebhooks = async(req, res) =>{
    try{
        //create a svix instance clerk webhook secret
        const whook = new  Webhook(process.env.CLERK_WEBHOOK_SECRET)
    }

    catch(error){

    }
}