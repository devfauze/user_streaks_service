import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export const authService = {
    async register(email: string, name: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, name, password: hashedPassword },
        });

        return user;
    },

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Usuário não encontrado");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Senha inválida");

        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

        return { token, user };
    },
};
