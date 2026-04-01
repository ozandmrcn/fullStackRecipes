import express from "express";
import cors from "cors";

// Import routes
import recipeRouter from "./routes/recipeRoutes.js";

// express setup
const app = express();

// Cors Middleware
app.use(cors());

// JSON Middleware for request body
app.use(express.json());

// Routes
app.use(recipeRouter);

const port = 4004;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
