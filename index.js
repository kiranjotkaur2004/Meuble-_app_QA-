import express from "express";
import colors from "colors"; // Ensure correct import
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoute.js";

// Load environment variables
dotenv.config();

// Connect to database
connectdb();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("<b>Welcome to the e-commerce app</b>");
});

// Define PORT with fallback
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgGreen
      .white
  );
});
