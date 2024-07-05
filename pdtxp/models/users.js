import mongoose, {Schema} from "mongoose";
const UserSchema = new mongoose.Schema({
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
}, {
    collection: 'authCollections' 
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;