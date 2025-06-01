import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import dbConnect from "./database/dbConnection.js";
import adminRouter from "./router/adminRoute.js";
import mailRouter from "./router/mailRoute.js";
import userRouter from "./router/userRoute.js";
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // or your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
// Basic route
app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

dbConnect();

console.log("hellloo");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", mailRouter);
app.use("/api/v1/user", adminRouter);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
