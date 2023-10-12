import { vehicleSchemaModel } from "../model/admin-VehicleModel.js";
import { driverModel } from "../model/driverModel.js";

export const allVehicles = async (req, res) => {
    const vehicles = await vehicleSchemaModel.find();

    return res.status(200).json({
        vehicles
    });
};

export const allDrivers = async (req, res) => {
    const drivers = await driverModel.find().select("driverName driverEmail driverPhone driverCategory isDriverVerified isDriverFree");

    return res.status(200).json({
        drivers
    });
};