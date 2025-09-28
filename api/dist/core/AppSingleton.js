// api/dist/core/AppSingleton.js
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

        // Caminho da pasta web inteira
        const webPath = path_1.default.join(__dirname, "../../..", "web");

        // Servir tudo da pasta web como estático
        this.app.use("/", express_1.default.static(webPath));

        // Fallback: qualquer rota que não seja /api/* retorna index.html
        this.app.get("*", (_req, res) => {
            res.sendFile(path_1.default.join(webPath, "views", "index.html"));
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
