import express from "express";
import { productRoutes } from "./routes/productRoutes.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { MONGO_URI, PORT } from "./constants.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(MONGO_URI);
const db = mongoose.connection;

db.on("open", () => {
  console.log("connection successful");
});

db.on("error", () => {
  console.log("connection not successful");
});

authRoutes(app);
cartRoutes(app);
productRoutes(app);
