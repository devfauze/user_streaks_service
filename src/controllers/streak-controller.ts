import { Request, Response } from "express";
import { streakService } from "../services/streak-service";

export const streakController = {
    async trackOpen(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            if (!userId) return res.status(400).json({ error: "userId é obrigatório" });

            const streakData = await streakService.trackOpen(userId);
            return res.json(streakData);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getStreak(req: Request, res: Response) {
        try {
            const { email } = req.params;
            if (!email) return res.status(400).json({ error: "email é obrigatório" });

            const streakData = await streakService.getStreak(email);
            return res.json(streakData);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getStreakHistory(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            if (!userId) return res.status(400).json({ error: "userId é obrigatório" });

            const history = await streakService.getStreakHistory(userId);

            return res.json(history);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

};
