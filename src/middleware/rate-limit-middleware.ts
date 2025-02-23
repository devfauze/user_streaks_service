import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: "Muitas tentativas de login. Tente novamente mais tarde." },
    standardHeaders: true,
    legacyHeaders: false,
});
