import { Router } from "express";
import { authController } from "../controllers/auth-controller";

const router = Router();

router.post("/register", async (req, res, next) => {
    try {
        await authController.register(req, res);
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        await authController.login(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
