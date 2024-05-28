import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerk_id:{type:String,required:true},
    firstName:{type:String},
    lastName:{type:String},
    fullName:{type:String},
    username:{type:String},
    phoneNumbers:{type:Array(String)},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    img_url:{type:String},
    lastSignInAt:{type:Date}
},{timestamps:true});

export default mongoose.model('user',userSchema);