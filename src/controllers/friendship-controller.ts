import { Request, Response } from "express";
import { friendshipService } from "../services/friendship-service";

export const friendshipController = {
    async sendFriendRequest(req: Request, res: Response) {
        try {
            const { userId, friendId } = req.body;
            if (!userId || !friendId) return res.status(400).json({ error: "userId e friendId são obrigatórios." });

            const request = await friendshipService.sendFriendRequest(userId, friendId);
            return res.status(201).json(request);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async acceptFriendRequest(req: Request, res: Response) {
        try {
            const { userId, friendId } = req.body;
            if (!userId || !friendId) return res.status(400).json({ error: "userId e friendId são obrigatórios." });

            await friendshipService.acceptFriendRequest(userId, friendId);
            return res.status(200).json({ message: "Pedido de amizade aceito." });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async declineFriendRequest(req: Request, res: Response) {
        try {
            const { userId, friendId } = req.body;
            if (!userId || !friendId) return res.status(400).json({ error: "userId e friendId são obrigatórios." });

            await friendshipService.declineFriendRequest(userId, friendId);
            return res.status(200).json({ message: "Pedido de amizade recusado." });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getFriends(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            if (!userId) return res.status(400).json({ error: "userId é obrigatório." });

            const friends = await friendshipService.getFriends(userId);
            return res.status(200).json(friends);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getPendingRequests(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            if (!userId) return res.status(400).json({ error: "userId é obrigatório." });

            const pendingRequests = await friendshipService.getPendingRequests(userId);
            return res.status(200).json(pendingRequests);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async removeFriend(req: Request, res: Response) {
        try {
            const { userId, friendId } = req.body;
            if (!userId || !friendId) return res.status(400).json({ error: "userId e friendId são obrigatórios." });

            await friendshipService.removeFriend(userId, friendId);
            return res.status(200).json({ message: "Amizade removida." });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
};
