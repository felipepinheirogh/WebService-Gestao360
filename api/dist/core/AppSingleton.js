"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSingleton = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("../routes"));
class AppSingleton {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        // Middleware base
        this.app.use(express_1.default.json());
        // API
        this.app.use("/api", routes_1.default);
        // Caminhos do frontend
        const webPath = path_1.default.join(__dirname, "../../..", "web");
        const publicPath = path_1.default.join(webPath, "public");
        const viewsPath = path_1.default.join(webPath, "views");
        // Arquivos estáticos (css, js, imagens)
        this.app.use(express_1.default.static(publicPath));
        // Views (HTML)
        this.app.use(express_1.default.static(viewsPath));
        // Fallback: qualquer rota que não seja /api/* retorna index.html
        this.app.get("*", (_req, res) => {
            res.sendFile(path_1.default.join(viewsPath, "index.html"));
        });
    }
    static getInstance() {
        if (!AppSingleton.instance) {
            AppSingleton.instance = new AppSingleton();
        }
        return AppSingleton.instance;
    }
    async start() {
        const port = process.env.PORT || 3000;
        this.server.listen(port, () => {
            console.log(`✅ Server running on http://localhost:${port}`);
        });
    }
}
exports.AppSingleton = AppSingleton;
// import express, { Application } from "express";
// import { createServer, Server } from "http";
// import path from "path";
// import routes from "../routes";
// export class AppSingleton {
//   private static instance: AppSingleton;
//   private app: Application;
//   private server: Server;
//   private constructor() {
//     this.app = express();
//     this.server = createServer(this.app);
//     // Middleware base
//     this.app.use(express.json());
//     // API
//     this.app.use("/api", routes);
//     // Servir frontend estático
//     const webPath = path.join(__dirname, "../../..", "web");
//     this.app.use(express.static(webPath + "/public"));
//     this.app.use("/", express.static(webPath + "/views"));
//   }
//   public static getInstance(): AppSingleton {
//     if (!AppSingleton.instance) {
//       AppSingleton.instance = new AppSingleton();
//     }
//     return AppSingleton.instance;
//   }
//   public async start(): Promise<void> {
//     const port = process.env.PORT || 3000;
//     this.server.listen(port, () => {
//       console.log(`✅ Server running on http://localhost:${port}`);
//     });
//   }
// }
// // // Padrao Singleton para a aplicacao 
// // import express, { Application } from "express";
// // import { createServer, Server } from "http";
// // import routes from "../routes";
// // export class AppSingleton {
// //   private static instance: AppSingleton;
// //   private app: Application;
// //   private server: Server;
// //   private constructor() {
// //     this.app = express();
// //     this.server = createServer(this.app);
// //     this.app.use(express.json());
// //     this.app.use("/api", routes);
// //   }
// //   public static getInstance(): AppSingleton {
// //     if (!AppSingleton.instance) {
// //       AppSingleton.instance = new AppSingleton();
// //     }
// //     return AppSingleton.instance;
// //   }
// //   public async start(): Promise<void> {
// //     const port = process.env.PORT || 3000;
// //     this.server.listen(port, () => {
// //       console.log(`✅ API running on port ${port}`);
// //     });
// //   }
// // }
