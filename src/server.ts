import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import streakRoutes from "./routes/streak-routes";
import authRoutes from "./routes/auth-routes";
import friendshipRoutes from "./routes/friendship-routes";
import leaderboardRoutes from "./routes/leaderboard-routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({
    origin: `${process.env.CORS_URL}`,
    credentials: true
}));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});

app.use("/streaks", streakRoutes);
app.use("/auth", authRoutes);
app.use("/friends", friendshipRoutes);
app.use("/leaderboard", leaderboardRoutes);