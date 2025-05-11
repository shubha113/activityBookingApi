import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";

//router imports
import authRoutes from "./routes/authRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//load environment variables
dotenv.config();

//connect to database
connectDb();

//intialize express
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/activities", activityRoutes);
app.use("/api/v1/booking", bookingRoutes);

//start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

app.use(errorMiddleware);
