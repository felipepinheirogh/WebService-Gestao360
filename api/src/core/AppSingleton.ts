import express, { Application, Request, Response, NextFunction } from "express";
import http, { Server } from "http";
import path from "path";
import fs from "fs";
import { registerRoutes } from "../routes";

export class AppSingleton {
  private static instance: AppSingleton;
  private app: Application;
  private server: Server;

  private constructor() {
    this.app = express();

    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Caminho absoluto do projeto
    const webRoot = path.resolve(__dirname, "../../web");

    // Servir arquivos estáticos (css, js, imagens)
    this.app.use(express.static(path.join(webRoot, "public")));

    // Registrar rotas da API
    registerRoutes(this.app);

    // Registrar rotas dinâmicas do frontend
    this.registerViewRoutes(path.join(webRoot, "views"));

    // Fallback: qualquer rota não mapeada vai para /
    this.app.get("*", (_req: Request, res: Response) => {
      res.redirect("/");
    });

    this.server = http.createServer(this.app);
  }

  public static getInstance(): AppSingleton {
    if (!AppSingleton.instance) {
      AppSingleton.instance = new AppSingleton();
    }
    return AppSingleton.instance;
  }

  public start(): void {
    const port: number = parseInt(process.env.PORT || "3000", 10);
    this.server.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  }

  /** Mapeia todas as views HTML como rotas dinâmicas */
  private registerViewRoutes(dir: string, routePrefix = ""): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        this.registerViewRoutes(fullPath, path.join(routePrefix, entry.name));
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        let routePath = path.join(routePrefix, entry.name.replace(".html", ""));

        // login.html vira /
        if (routePath === "/auth/login") {
          routePath = "/";
        }

        // dashboard/index.html vira /dashboard
        if (routePath.endsWith("/index") && routePath !== "/") {
          routePath = routePath.replace(/\/index$/, "");
        }

        // Normaliza separadores de caminho
        routePath = routePath.replace(/\\/g, "/");

        this.app.get(routePath, (_req: Request, res: Response, next: NextFunction) => {
          res.sendFile(fullPath, (err) => {
            if (err) {
              next(err);
            }
          });
        });
      }
    }
  }
}
