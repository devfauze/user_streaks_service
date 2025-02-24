import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const leaderboardService = {
    async getLeaderboard(userId: string, mode: string = "friends") {
        switch (mode) {
            case "global":
                return await prisma.user.findMany({
                    select: {
                        id: true,
                        name: true,
                        email: true, // Adicionando o email
                        bestStreak: true
                    },
                    orderBy: { bestStreak: "desc" }
                });

            case "friends":
            default:
                const friendships = await prisma.friendship.findMany({
                    where: {
                        OR: [
                            { userId, status: "ACCEPTED" },
                            { friendId: userId, status: "ACCEPTED" }
                        ]
                    },
                    select: {
                        userId: true,
                        friendId: true
                    }
                });

                const friendIds = friendships.map(f => f.userId === userId ? f.friendId : f.userId);

                return await prisma.user.findMany({
                    where: { id: { in: friendIds } },
                    select: {
                        id: true,
                        name: true,
                        email: true, // Adicionando o email
                        bestStreak: true
                    },
                    orderBy: { bestStreak: "desc" }
                });
        }
    }
};
