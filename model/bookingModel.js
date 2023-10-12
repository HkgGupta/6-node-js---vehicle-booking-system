import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "vehcle"
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driver",
        default: null
    },
    pickupAddress: {
        type: String,
        required: true
    },
    dropAddress: {
        type: String,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    dropDate: {
        type: Date,
        default: null
    },
    pickupTime: {
        type: String,
        required: true
    },
    dropTime: {
        type: String,
        default: ""
    },
    distanceTravelled: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    paymentMode: {
        type: String,
        default: ""
    },
    paid: {
        type: Boolean,
        default: false
    },
    bookedStatus: {
        type: Boolean,
        default: false
    },
    cancelledReason: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

export const bookingModel = mongoose.model("booking", bookingSchema);