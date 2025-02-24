import { PrismaClient, FriendshipStatus } from "@prisma/client";
import {userService} from "./userService";

const prisma = new PrismaClient();

export const friendshipService = {
    async sendFriendRequest(userId: string, senderEmail: string, friendEmail: string) {
        if (!userId || !friendEmail) throw new Error("Parâmetros inválidos.");

        const friend = await userService.findUserByEmail(friendEmail);
        if (!friend) throw new Error("Usuário não encontrado.");

        if (userId === friend.id) throw new Error("Você não pode adicionar a si mesmo como amigo.");

        return await prisma.friendship.create({
            data: { userId, senderEmail, friendId: friend.id, status: FriendshipStatus.PENDING },
        });
    },

    async acceptFriendRequest(userId: string, friendId: string) {
        return await prisma.friendship.updateMany({
            where: { userId: userId, friendId: friendId, status: FriendshipStatus.PENDING },
            data: { status: FriendshipStatus.ACCEPTED },
        });
    },

    async declineFriendRequest(requestId: string) {
        return await prisma.friendship.deleteMany({
            where: { id: requestId, status: FriendshipStatus.PENDING },
        });
    },

    async getFriends(userId: string) {
        return await prisma.friendship.findMany({
            where: {
                OR: [
                    { userId, status: FriendshipStatus.ACCEPTED },
                    { friendId: userId, status: FriendshipStatus.ACCEPTED },
                ],
            },
            include: { user: true, friend: true },
        });
    },

    async getPendingRequests(userId: string) {
        return await prisma.friendship.findMany({
            where: { friendId: userId, status: FriendshipStatus.PENDING },
            include: { user: true },
        });
    },

    async removeFriend(userId: string, friendEmail: string) {
        const friend = await userService.findUserByEmail(friendEmail);
        if (!friend) throw new Error("Usuário não encontrado.");

        return await prisma.friendship.deleteMany({
            where: {
                OR: [
                    { userId, friendId: friend.id, status: FriendshipStatus.ACCEPTED },
                    { userId: friend.id, friendId: userId, status: FriendshipStatus.ACCEPTED },
                ],
            },
        });
    }
};
