import express from 'express';
import { adminValidate } from '../middleware/adminValidate.js';
import { addCategory, addVehicle, adminLogin, adminRegister, allBookings, assignDriver } from '../controller/admin.js';
import { adminCheckAuth } from '../middleware/adminAuth.js';
import { vehicleValidate } from '../middleware/vehicleValidation.js';

const adminRoute = express.Router();

adminRoute.post("/adminRegister", adminValidate, adminRegister);

adminRoute.post("/adminLogin", adminLogin);

adminRoute.post("/addCategory", adminCheckAuth, addCategory);

adminRoute.post("/addVehicle", vehicleValidate, adminCheckAuth, addVehicle);

adminRoute.get("/allBookings", allBookings);

adminRoute.put("/assignDriver", assignDriver);

export default adminRoute;  