import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const controller = new AuthController();

/**
 * POST /auth/login
 * Autentica usuário
 */
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const result = await controller.login(username, password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /auth/logout
 * Encerra sessão
 */
router.post(
  "/logout",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await controller.logout();
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;

// // Definicao das Rotas de Autenticacao 
// import { Router } from "express";
// import { AuthController } from "../controllers/AuthController";

// const router = Router();
// const authController = new AuthController();

// router.post("/login", (req, res) => authController.login(req, res));

// export default router;
