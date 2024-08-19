import mongoose, { Schema, models } from "mongoose";

// Define the User schema
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
    pubkey: {
        type: String,
    },
}, {
    collection: 'authCollections'
});

// Define the Questions schema
const questSchema = new Schema({
    sno: {
        type: String,
        required: true,
        unique: true,
    },
    q: {
        type: String,
        required: true,
    },
    a: {
        type: String,
        required: true,
    },
    b: {
        type: String,
        required: true,
    },
    c: {
        type: String,
        required: true,
    },
    d: {
        type: String,
        required: true,
    },
}, {
    collection: 'questionsBank'
});

// Compile models only if they don't exist to prevent overwriting during hot reloading
export const User = models.User || mongoose.model("User", userSchema);
export const Questions = models.Questions || mongoose.model("Questions", questSchema);

// Export the models
// export default { User, Questions };
