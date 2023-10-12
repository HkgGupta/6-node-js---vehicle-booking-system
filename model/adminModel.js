import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    adminPhone: {
        type: Number,
        required: true
    }
});

export const adminModel = mongoose.model("admin", adminSchema);