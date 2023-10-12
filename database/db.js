import mongoose from "mongoose";

export const dbConnect = async () => {
    const DB_URL = "mongodb://127.0.0.1:27017/vehicle_booking_system";

    try {
        mongoose.connect(DB_URL);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB error " + error);
    }

};