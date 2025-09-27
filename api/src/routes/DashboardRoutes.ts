import { Router, Request, Response, NextFunction } from "express";
import { DashboardController } from "../controllers/DashboardController";

const router = Router();
const controller = new DashboardController();

/**
 * GET /dashboard
 * Dados do dashboard
 */
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await controller.getData();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
