import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import pageRoutes from "./routes/page.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/", pageRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server running on http://localhost:" + PORT);
});
