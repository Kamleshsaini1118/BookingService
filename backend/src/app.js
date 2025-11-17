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
    origin: (origin, callback) => {
        const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || ["https://booking-service-navy.vercel.app", "http://localhost:5173"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-HTTP-Method-Override"],
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 200
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