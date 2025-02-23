import { Request, Response } from "express";
import { authService } from "../services/auth-service";
import { z } from "zod";

export const authController = {
    async register(req: Request, res: Response) {
        const schema = z.object({
            email: z.string().email(),
            name: z.string().min(2),
            password: z.string().min(6),
        });

        try {
            const { email, name, password } = schema.parse(req.body);
            const user = await authService.register(email, name, password);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    },

    async login(req: Request, res: Response) {
        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });

        try {
            const { email, password } = schema.parse(req.body);
            const { token, user } = await authService.login(email, password);
            return res.json({ token, user });
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    },
};
