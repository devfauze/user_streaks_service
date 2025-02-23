import { Request, Response } from "express";
import { leaderboardService } from "../services/leaderboard-service";

export const leaderboardController = {
    async getLeaderboard(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { mode } = req.query;

            if (!userId) return res.status(400).json({ error: "userId é obrigatório" });

            const leaderboard = await leaderboardService.getLeaderboard(userId, mode as string || "friends");
            return res.json(leaderboard);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
};

