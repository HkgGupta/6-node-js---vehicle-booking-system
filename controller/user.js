import { bookingModel } from "../model/bookingModel.js";
import { userModel } from "../model/userModel.js";
import jwt from 'jsonwebtoken';

export const userRegister = async (req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPhone = req.body.userPhone;
    const userPassword = req.body.userPassword;

    const newUser = new userModel({
        userName,
        userEmail,
        userPhone,
        userPassword
    });

    const isExist = await userModel.findOne({ userEmail: userEmail });
    if (isExist) {
        return res.status(400).json({
            Alert: "Already exist"
        });
    }

    await newUser.save();

    return res.status(200).json({
        Message: "User register"
    });
};

export const userLogin = async (req, res) => {
    try {
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;

        const checkUser = await userModel.findOne({ userEmail: userEmail });
        if (checkUser) {
            if (checkUser.userPassword === userPassword) {
                const token = jwt.sign({ credential: checkUser }, process.env.USER_SECRET_KEY);
                return res.status(200).json({
                    Message: "User Logged In",
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

export const allUsers = async (req, res) => {
    const users = await userModel.find();

    return res.status(200).json({
        users
    });
};

export const booking = async (req, res) => {
    const userId = req.body.userId;
    const vehicleId = req.body.vehicleId;
    const pickupAddress = req.body.pickupAddress;
    const dropAddress = req.body.dropAddress;
    const pickupDate = req.body.pickupDate;
    const pickupTime = req.body.pickupTime;

    const newBooking = new bookingModel({
        userId: userId,
        vehicleId: vehicleId,
        pickupAddress: pickupAddress,
        dropAddress: dropAddress,
        pickupDate: pickupDate,
        pickupTime: pickupTime
    });

    const booked = await newBooking.save();

    return res.status(200).json({
        Message: "Booking ",
        detail: booked
    });

};