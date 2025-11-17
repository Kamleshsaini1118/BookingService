import express, { urlencoded } from 'express';
import cors from "cors"
import authRouter from "./routes/authRoutes.js"
import serviceRouter from "./routes/serviceRoutes.js"
import bookingRouter from "./routes/bookingRoute.js";

const app = express();

//basic configuration 
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(urlencoded({
    extended: true,
    limit: "16kb"
}))

// cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://booking-service-navy.vercel.app/",
    Credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE","OPTIONS"],
    allowedHeaders: ["Content-type", "Authorization"]
}))

// auth routes 
app.use("/auth", authRouter);

// public route (service api)
app.use("/services", serviceRouter)

// protected api for booking
app.use("/booking", bookingRouter);

// testing route
app.get("/", (req, res) => {
    res.send("welcome to booking service");
})

export default app;