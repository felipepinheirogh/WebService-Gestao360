// Registro central e aplicacao dos sub-modulos de rotas 
import { Router } from "express";
import authRoutes from "./routes/AuthRoutes";

const router = Router();

router.use("/auth", authRoutes);

export default router;
