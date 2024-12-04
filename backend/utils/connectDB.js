import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected successfully.`);
  } catch (err) {
    console.log(`Error connecting to Mongodb ${err}`);
    process.exit(1);
  }
};
