<<<<<<< HEAD
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {type:String, required: true},
    name:{type:String, required: true},
    email:{type:String, required: true, unique:true},
    resume:{type:String},
    image:{type:String, required: true},
})

const User = mongoose.model('User',userSchema)

=======
import mongoose, { mongo } from "mongoose";


const userSchema = new mongoose.Schema({
    _id: {type:String, required : true},
    name: {type:String, required : true},
    email: {type: String, required: true, unique: true},
    resume: {type: String},
    image: {type : String, required : true},

})

const User = mongoose.model('User', userSchema);
>>>>>>> b3d47349f4505e8231e0b7212c415fcc4af3477c
export default User;