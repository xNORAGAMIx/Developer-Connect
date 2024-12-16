import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "./utils/passportConfig.js";
import { connectDB } from "./utils/connectDB.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();

const PORT = 5000;

//Passport Middleware
app.use(passport.initialize());
//Middlewares
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser())

//Post routes
app.use("/api/v1/posts", postRoutes);

//User routes
app.use("/api/v1/users", userRoutes);

//Not found route
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found!",
  });
});

//Error Handling Middleware
app.use((error, req, res, next) => {
  // prepare the error message
  const message = error.message;
  const stack = error.stack;
  res.status(500).json({
    message,
    stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
