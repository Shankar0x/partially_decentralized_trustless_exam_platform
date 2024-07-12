import mongoose, { models, mongo, Schema } from "mongoose";
const userSchema = new Schema({
    eno: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    pfp: {
        type: String,
        required: true,
    },
    pubkey:{
        type: String,
    }
}, 
    {
    collection: 'authCollections' 
    });
const User = models.User || mongoose.model("User", userSchema);

export default User;