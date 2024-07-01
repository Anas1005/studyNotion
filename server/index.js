const express = require('express');
const userRouter = require('./routers/userRouter');
const courseRouter = require('./routers/courseRouter');
const paymentRouter = require('./routers/paymentRouter');
const profileRouter = require('./routers/profileRouter');
const os = require('os');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');
const fileupload = require('express-fileupload');
const cors = require("cors");
const cluster = require('cluster');
require("dotenv").config();

const FRONTEND_URL = "https://studynotionfrontend.onrender.com";

// Get the number of CPUs
const numberOfCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master process is running with PID: ${process.pid}`);
    console.log(`Number of CPUs: ${numberOfCPUs}`);

    // Fork worker processes
    for (let i = 0; i < numberOfCPUs; i++) {
        cluster.fork();
    }

    // Listen for dying workers and replace them
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
        cluster.fork();
    });
} else {
    // Worker processes will run the server
    const server = express();

    const PORT = process.env.PORT || 4000;
    server.use(cors({
        origin: FRONTEND_URL,
        credentials: true
    }));

    server.use(express.json());
    server.use(fileupload({
        useTempFiles: true,
        tempFileDir: '/tmp'
    }));

    server.use("/api/v1/auth", userRouter);
    server.use("/api/v1/course", courseRouter);
    server.use("/api/v1/payment", paymentRouter);
    server.use("/api/v1/profile", profileRouter);
    server.use(cookieParser());
    server.get("/", (req, res) => {
        return res.json({
            success: true,
            message: "Your Server is Up and Running......"
        });
    });

    // Connect to the DB...
    dbConnect();
    cloudinaryConnect();

    // Start the Server.....
    server.listen(PORT, () => {
        console.log(`Worker ${process.pid} started and server running on port ${PORT}`);
    });
}
