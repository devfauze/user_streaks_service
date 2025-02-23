import { Router } from "express";
import { authController } from "../controllers/auth-controller";
import {loginLimiter} from "../middleware/rate-limit-middleware";

const router = Router();

router.post("/register", async (req, res, next) => {
    try {
        await authController.register(req, res);
    } catch (error) {
        next(error);
    }
});

router.post("/login", loginLimiter, async (req, res, next) => {
    try {
        await authController.login(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
