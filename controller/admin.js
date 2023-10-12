import { adminModel } from "../model/adminModel.js";
import jwt from 'jsonwebtoken';
import { vehicleCategoryModel } from "../model/admin-VehicleCategoryModel.js";
import { vehicleSchemaModel } from "../model/admin-VehicleModel.js";
import path from 'path';
import { bookingModel } from "../model/bookingModel.js";
import { driverModel } from "../model/driverModel.js";

export const adminRegister = async (req, res) => {
    try {
        const adminName = req.body.adminName;
        const adminEmail = req.body.adminEmail;
        const adminPhone = req.body.adminPhone;
        const adminPassword = req.body.adminPassword;

        const isExist = await adminModel.findOne({ adminEmail: adminEmail });
        if (isExist) {
            return res.status(400).json({
                Alert: "Already exist"
            });
        }

        const newAdmin = new adminModel({
            adminName: adminName,
            adminEmail: adminEmail,
            adminPhone: adminPhone,
            adminPassword: adminPassword
        });

        await newAdmin.save();

        res.status(200).json({
            Message: "new Admin added"
        });
    } catch (error) {
        return res.status(400).json({
            Message: "Error " + error
        });
    }
};

export const adminLogin = async (req, res) => {
    try {
        const adminEmail = req.body.adminEmail;
        const adminPassword = req.body.adminPassword;

        if (!adminEmail || adminEmail === "") {
            return res.status(400).json({
                Message: "Email is required",
            });
        }
        if (!adminPassword || adminPassword === "") {
            return res.status(400).json({
                Message: "Password is required",
            });
        }

        const checkAdmin = await adminModel.findOne({ adminEmail: adminEmail });
        if (checkAdmin) {
            if (checkAdmin.adminPassword === adminPassword) {
                const token = jwt.sign({ credential: checkAdmin }, process.env.ADMIN_SECRET_KEY);
                return res.status(200).json({
                    Message: "Admin Logged In",
                    token: token
                });
            } else {
                return res.status(401).json({
                    Error: "Password Wrong"
                });
            }
        } else {
            return res.status(401).json({
                Error: "Admin Not Found"
            });
        }
    } catch (error) {
        return res.status(401).json({
            Errorr: error
        });
    }
};

export const addCategory = async (req, res) => {
    try {
        const categoryName = req.body.categoryName;

        if (!addCategory || addCategory === "") {
            return res.status(400).json({
                Message: "Category name is required",
            });
        }

        const isExist = await vehicleCategoryModel.findOne({ categoryName: categoryName });
        if (isExist) {
            return res.status(400).json({
                Alert: "Category Already exist"
            });
        }

        const newCategory = new vehicleCategoryModel({
            categoryName: categoryName
        });
        await newCategory.save();

        res.status(200).json({
            Message: "New Category added",
            categoryName: categoryName
        });
    } catch (error) {
        return res.status(400).json({
            Message: "Error " + error
        });
    }
};

export const addVehicle = async (req, res) => {
    try {
        const vehicleName = req.body.vehicleName;
        const vehicleModel = req.body.vehicleModel;
        const vehicleNumber = req.body.vehicleNumber;
        const vehicleCategory = req.body.vehicleCategory;
        const vehicleImage = req.files.vehicleImage;
        const vehicleCostPerKM = req.body.vehicleCostPerKM;
        const isVehicleFree = req.body.isVehicleFree;

        let photo;
        if ((vehicleImage.mimetype === "image/jpg") || (vehicleImage.mimetype === "image/png") || (vehicleImage.mimetype === "image/jpeg")) {

            photo = Date.now() + "-" + vehicleImage.name;
            const newPath = path.join(process.cwd(), "vehicleImage", photo);
            await vehicleImage.mv(newPath);
        }
        else {
            return res.status(400).json({
                Alert: "File Type Error - Only Image Formats are allowed"
            });
        }

        const newVehicle = await new vehicleSchemaModel({
            vehicleName,
            vehicleModel,
            vehicleNumber,
            vehicleCategory,
            vehicleImage: photo,
            vehicleCostPerKM,
            isVehicleFree
        });

        await newVehicle.save();

        return res.status(201).json({
            Message: "New Vehicle added"
        });

    } catch (error) {
        return res.status(400).json({
            Error: error
        });
    }
};

export const allBookings = async (req, res) => {
    const allBookings = await bookingModel.find({ bookedStatus: false }).sort('-createdAt');

    return res.status(200).json({
        AllBooking: allBookings
    });
};

export const assignDriver = async (req, res) => {
    try {
        const bookingId = req.body.bookingId;
        const driverId = req.body.driverId;

        const checkDriver = await bookingModel.findOne({ $and: [{ _id: bookingId }, { driverId: null }] });
        if (checkDriver) {
            const update = await bookingModel.findByIdAndUpdate({ _id: bookingId }, { driverId: driverId, bookedStatus: true });

            await driverModel.findByIdAndUpdate({ _id: driverId }, { isDriverFree: false });

            return res.status(200).json({
                Message: "Assigned Driver"
            });
        } else {
            return res.status(200).json({
                Message: "Driver Already Assigned"
            });
        }
    } catch (error) {

    }
}

