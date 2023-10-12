import mongoose from "mongoose";


const vehicleCategory = mongoose.Schema({

    categoryName: {
        type: String,
        required: true
    }
});

export const vehicleCategoryModel = mongoose.model('category', vehicleCategory);