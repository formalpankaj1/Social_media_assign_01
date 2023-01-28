import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true,unique:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers:{type:[String],default:[]},
    followings:{type:[String],default:[]},
    id: { type: String },
});

const UserModal = mongoose.model("User", userSchema);
export default UserModal;