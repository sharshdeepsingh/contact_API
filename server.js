import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { config } from "dotenv";
import userRouter from "./Routes/user.routes.js";
import contactRouter from "./Routes/contact.routes.js";

const app = express();
config();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    dbName: "NodeJs_Mastery_Course",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    // Start the server only after DB connection is established
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// Routes
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);
