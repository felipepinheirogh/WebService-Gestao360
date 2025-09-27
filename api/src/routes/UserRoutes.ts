import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const controller = new UserController();

/**
 * GET /user
 * Lista todos os usuários
 */
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await controller.list();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /user/:id
 * Detalhes de um usuário
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await controller.getById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export default router;
