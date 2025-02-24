import { Request, Response } from "express";
import { friendshipService } from "../services/friendship-service";
import {userService} from "../services/userService";

export const friendshipController = {
    async sendFriendRequest(req: Request, res: Response) {
        try {
            console.log("Body recebido:", req.body);
            const { senderId, senderEmail, receiverEmail } = req.body;
            if (!senderId || !senderEmail || !receiverEmail) return res.status(400).json({ error: "senderId e friendId são obrigatórios." });

            const request = await friendshipService.sendFriendRequest(senderId, senderEmail, receiverEmail);
            return res.status(201).json(request);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async acceptFriendRequest(req: Request, res: Response) {
        try {
            console.log("Body recebido:", req.body);
            const { senderId, requestId } = req.body;
            if (!senderId || !requestId) return res.status(400).json({ error: "senderId e requestId são obrigatórios." });

            await friendshipService.acceptFriendRequest(senderId, requestId);
            return res.status(200).json({ message: "Pedido de amizade aceito." });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    },

    async declineFriendRequest(req: Request, res: Response) {
        try {
            const { requestId } = req.body;
            if (!requestId) return res.status(400).json({ error: "userId e friendId são obrigatórios." });

            await friendshipService.declineFriendRequest(requestId);
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
            const { userId, friendEmail } = req.body;
            if (!userId || !friendEmail) return res.status(400).json({ error: "userId e friendId são obrigatórios." });
            await friendshipService.removeFriend(userId, friendEmail);
            return res.status(200).json({ message: "Amizade removida." });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
};
