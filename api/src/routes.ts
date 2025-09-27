// Registro central das rotas da API
import { Application } from "express";
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/UserRoutes";
import clienteRoutes from "./routes/ClienteRoutes";
import dashboardRoutes from "./routes/DashboardRoutes";

/**
 * Registra todas as rotas da API no app
 */
export function registerRoutes(app: Application): void {
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/cliente", clienteRoutes);
  app.use("/dashboard", dashboardRoutes);
}

// // Registro central e aplicacao dos sub-modulos de rotas 
// import { Router } from "express";
// import authRoutes from "./routes/AuthRoutes";

// const router = Router();

// router.use("/auth", authRoutes);

// export default router;
