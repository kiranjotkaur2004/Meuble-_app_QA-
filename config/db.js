import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    //use built-in objects to access MONGO_URL
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in .env file");
    }

    const conn = await mongoose.connect(process.env.MONGO_URL, {
      //basically for modern to connect to MongoDB
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 90000,
    });

    console.log(` Connected to MongoDB: ${conn.connection.host}`.bgBlue.white);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

export default connectDB;
