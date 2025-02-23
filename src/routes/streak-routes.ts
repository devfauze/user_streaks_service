import { Router } from "express";
import { streakController } from "../controllers/streak-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const router = Router();

// @ts-ignore
router.post("/track", authMiddleware, async (req, res, next) => {
    try {
        await streakController.trackOpen(req, res);
    } catch (error) {
        next(error);
    }
});

// @ts-ignore
router.get("/:email", authMiddleware, async (req, res, next) => {
    try {
        await streakController.getStreak(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
