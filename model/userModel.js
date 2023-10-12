import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userPhone: {
        type: Number,
        required: true
    }
});

export const userModel = mongoose.model("user", userSchema);
