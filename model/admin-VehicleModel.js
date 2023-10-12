import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema({
    vehicleName: {
        type: String,
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    vehicleCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    vehicleImage: {
        type: String,
        default: ""
    },
    vehicleCostPerKM: {
        type: Number,
        required: true
    },
    isVehicleFree: {
        type: Boolean,
        default: true
    }
});

export const vehicleSchemaModel = mongoose.model("vehcle", vehicleSchema);