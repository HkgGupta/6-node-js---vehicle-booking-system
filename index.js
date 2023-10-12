import express from 'express';
import { dbConnect } from './database/db.js';
import adminRoute from './routes/adminRoute.js';
import dotenv from 'dotenv';
import expressfileupload from 'express-fileupload';
import driverRoute from './routes/driverRoute.js';
import userRoute from './routes/userRoute.js';
import commonRoute from './routes/commonRoute.js';

const app = express();

app.use(express.json());

app.use(expressfileupload({
    useTempFiles: false,
    tempFileDir: 'public/'
}));

dotenv.config();

dbConnect();

app.listen("3000", () => {
    console.log("Server started at http://localhost:3000");
});

app.use("/admin", adminRoute);
app.use("/driver", driverRoute);
app.use("/user", userRoute);
app.use("/", commonRoute)


