import express from 'express';
import { driverLogin, driverRegister, driverRideCompleted, getBookings } from '../controller/driver.js';

const driverRoute = express.Router();

driverRoute.post("/driverRegister", driverRegister);
driverRoute.post("/driverLogin", driverLogin);
driverRoute.get("/bookings", getBookings);
driverRoute.put("/rideComplete", driverRideCompleted);

export default driverRoute;