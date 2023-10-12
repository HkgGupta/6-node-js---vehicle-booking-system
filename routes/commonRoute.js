import express from 'express';
import { allDrivers, allVehicles } from '../controller/common.js';

const commonRoute = express.Router();

commonRoute.get("/allVehicles", allVehicles);

commonRoute.get("/allDrivers", allDrivers);

export default commonRoute;