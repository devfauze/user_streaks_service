import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import streakRoutes from "./routes/streak-routes";
import authRoutes from "./routes/auth-routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});

app.use("/streaks", streakRoutes);
app.use("/auth", authRoutes);
