import express from "express";
import userRoutes from "./routes/user.js";

const app=express();

app.use(express.json());

app.use("/api/users", userRoutes);

export default app;