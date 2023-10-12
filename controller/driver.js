import jwt from "jsonwebtoken";
import { driverModel } from "../model/driverModel.js";
import path from 'path';
import { bookingModel } from "../model/bookingModel.js";
import { vehicleSchemaModel } from "../model/admin-VehicleModel.js";


export const driverRegister = async (req, res) => {
    try {
        const driverName = req.body.driverName;
        const driverEmail = req.body.driverEmail;
        const driverPhone = req.body.driverPhone;
        const driverAddress = req.body.driverAddress;
        const driverCategory = req.body.driverCategory;
        const driverLicenseImage = req.files.driverLicenseImage;
        const driverAadhaarImage = req.files.driverAadhaarImage;
        const isDriverVerified = req.body.isDriverVerified;
        const isDriverFree = req.body.isDriverFree;
        const driverPassword = req.body.driverPassword;

        let doc1, doc2;
        doc1 = Date.now() + "-" + driverLicenseImage.name;
        const newPath = path.join(process.cwd(), "DriverDoc", doc1);
        await driverLicenseImage.mv(newPath);

        doc2 = Date.now() + "-" + driverAadhaarImage.name;
        const newPath2 = path.join(process.cwd(), "DriverDoc", doc2);
        await driverAadhaarImage.mv(newPath2);

        const isExist = await driverModel.findOne({ driverEmail: driverEmail });
        if (isExist) {
            return res.status(400).json({
                Alert: "Already exist"
            });
        }

        const driverRegister = new driverModel({
            driverName,
            driverEmail,
            driverPhone,
            driverAddress,
            driverCategory,
            driverLicenseImage: doc1,
            driverAadhaarImage: doc2,
            isDriverVerified,
            isDriverFree,
            driverPassword
        });

        await driverRegister.save();

        return res.status(201).json({
            Message: "Driver Register"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            Error: error
        });
    }
};

export const driverLogin = async (req, res) => {
    try {
        const driverEmail = req.body.driverEmail;
        const driverPassword = req.body.driverPassword;

        const checkDriver = await driverModel.findOne({ driverEmail: driverEmail });
        if (checkDriver) {
            if (checkDriver.driverPassword === driverPassword) {
                const token = jwt.sign({ credential: checkDriver }, process.env.DRIVER_SECRET_KEY);
                return res.status(200).json({
                    Message: "Driver Logged In",
                    token: token
                });
            }
            else {
                return res.status(401).json({
                    Error: "Password Wrong"
                });
            }
        } else {
            return res.status(401).json({
                Error: "Not Found"
            });
        }
    } catch (error) {
        return res.status(401).json({
            Error: error
        });
    }
};

export const getBookings = async (req, res) => {
    const driverId = req.body.driverId;

    const getBookings = await bookingModel.find({ $and: [{ driverId: driverId }, { bookedStatus: true }] });

    return res.status(200).json({
        Bookings: getBookings
    });
};

export const driverRideCompleted = async (req, res) => {
    const driverId = req.body.driverId;
    const bookingId = req.body.bookingId;
    const vehicleId = req.body.vehicleId;
    const dropDate = req.body.dropDate;
    const dropTime = req.body.dropTime;
    const distanceTravelled = parseFloat(req.body.distanceTravelled);
    let totalPrice = 0.0;

    const p = await vehicleSchemaModel.findById({ _id: vehicleId });

    totalPrice = distanceTravelled * p.vehicleCostPerKM;

    const driverRideCompleted = await bookingModel.findByIdAndUpdate({ _id: bookingId }, { dropDate: dropDate, dropTime: dropTime, distanceTravelled: distanceTravelled, totalPrice: totalPrice });

    await driverModel.findByIdAndUpdate({ _id: driverId }, { isDriverFree: true });

    return res.status(200).json({
        RideComplete: driverRideCompleted
    });

};