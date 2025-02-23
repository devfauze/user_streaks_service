import { Router } from "express";
import { leaderboardController } from "../controllers/leaderboard-controller";

const router = Router();

router.get("/:userId", async (req, res, next) => {
    try {
        await leaderboardController.getLeaderboard(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
