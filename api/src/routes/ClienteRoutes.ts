import { Router, Request, Response, NextFunction } from "express";
import { ClienteController } from "../controllers/ClienteController";

const router = Router();
const controller = new ClienteController();

/**
 * GET /cliente
 * Lista clientes
 */
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const clientes = await controller.list();
    res.json(clientes);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /cliente/:id
 * Detalhes de um cliente
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cliente = await controller.getById(req.params.id);
    res.json(cliente);
  } catch (err) {
    next(err);
  }
});

export default router;
