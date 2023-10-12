import express from 'express';
import { allUsers, booking, userLogin, userRegister } from '../controller/user.js';

const userRoute = express.Router();
userRoute.post("/userRegister", userRegister);
userRoute.post("/userLogin", userLogin);
userRoute.get("/allUsers", allUsers);
userRoute.post("/booking", booking);

export default userRoute;