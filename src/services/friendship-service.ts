import { PrismaClient, FriendshipStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const friendshipService = {
    async sendFriendRequest(userId: string, friendId: string) {
        if (userId === friendId) throw new Error("Você não pode adicionar a si mesmo como amigo.");

        return await prisma.friendship.create({
            data: { userId, friendId, status: FriendshipStatus.PENDING },
        });
    },

    async acceptFriendRequest(userId: string, friendId: string) {
        return await prisma.friendship.updateMany({
            where: { userId: friendId, friendId: userId, status: FriendshipStatus.PENDING },
            data: { status: FriendshipStatus.ACCEPTED },
        });
    },

    async declineFriendRequest(userId: string, friendId: string) {
        return await prisma.friendship.deleteMany({
            where: { userId: friendId, friendId: userId, status: FriendshipStatus.PENDING },
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

    async removeFriend(userId: string, friendId: string) {
        return await prisma.friendship.deleteMany({
            where: {
                OR: [
                    { userId, friendId, status: FriendshipStatus.ACCEPTED },
                    { userId: friendId, friendId: userId, status: FriendshipStatus.ACCEPTED },
                ],
            },
        });
    }
};
