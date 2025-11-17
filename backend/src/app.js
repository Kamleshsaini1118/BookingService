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

// CORS configuration
const allowedOrigins = [
    'https://bookingservice-1-csg6.onrender.com',
    'https://booking-service-navy.vercel.app',
    'http://localhost:5173',
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-HTTP-Method-Override');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

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