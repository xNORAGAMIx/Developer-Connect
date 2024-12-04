import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/connectDB.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
connectDB();
const app = express();

const PORT = 5000;

//Middlewares
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

//Post routes
app.use("/api/v1/posts", postRoutes);

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
