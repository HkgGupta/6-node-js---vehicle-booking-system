import mongoose from "mongoose";

const driverSchema = mongoose.Schema({
    driverName: {
        type: String,
        required: true
    },
    driverEmail: {
        type: String,
        required: true
    },
    driverPhone: {
        type: Number,
        required: true
    },
    driverAddress: {
        type: String,
        required: true
    },
    driverCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    driverLicenseImage: {
        type: String,
        default: ""
    },
    driverAadhaarImage: {
        type: String,
        default: ""
    },
    isDriverVerified: {
        type: Boolean,
        default: false
    },
    isDriverFree: {
        type: Boolean,
        default: true
    },
    driverPassword: {
        type: String,
        required: true
    }
});

export const driverModel = mongoose.model("driver", driverSchema);