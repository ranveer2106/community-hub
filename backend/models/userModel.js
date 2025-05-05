import mongoose from "mongoose"

// const userSchema = new mongoose.Schema({
//     name:{type:String,required:true},
//     email:{type:String,required:true,unique:true},
//     password:{type:String,required:true},
//     cartData:{type:Object,default:{}}
// },{minimize:false})

// const userModel = mongoose.models.user || mongoose.model("user",userSchema);
// export default userModel;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }, // New field for roles
    credits: { type: Number, default: 0 }, // New field for credit points
    savedContent: [String], // IDs of saved content
    reportedContent: [String], // IDs of reported content
}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;