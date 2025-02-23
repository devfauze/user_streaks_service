import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const streakService = {
    async trackOpen(userId: string) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let streak = await prisma.streak.findFirst({
            where: { userId },
            orderBy: { lastOpen: "desc" },
        });

        if (streak) {
            const lastOpenDate = new Date(streak.lastOpen);
            lastOpenDate.setHours(0, 0, 0, 0);
            const diff = (today.getTime() - lastOpenDate.getTime()) / (1000 * 60 * 60 * 24);

            if (diff < 1) {
                throw new Error("Streak já registrado hoje.");
            } else if (diff < 2) {
                streak = await prisma.streak.update({
                    where: { id: streak.id },
                    data: { count: streak.count + 1, lastOpen: today },
                });
            } else {
                streak = await prisma.streak.create({
                    data: { userId, lastOpen: today, count: 1 },
                });
            }
        } else {
            streak = await prisma.streak.create({
                data: { userId, lastOpen: today, count: 1 },
            });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (streak.count > user!.bestStreak) {
            await prisma.user.update({
                where: { id: userId },
                data: { bestStreak: streak.count },
            });
        }

        return { currentStreak: streak.count, bestStreak: user!.bestStreak };
    },

    async getStreak(email: string) {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, bestStreak: true },
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const streak = await prisma.streak.findFirst({
            where: { userId: user.id },
            orderBy: { lastOpen: "desc" },
            select: { count: true },
        });

        return { currentStreak: streak?.count || 0, bestStreak: user.bestStreak || 0 };
    }
};
