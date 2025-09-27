// api/dist/index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ponto de entrada (Entry Point) da API 
const AppSingleton_1 = require("./core/AppSingleton");
async function bootstrap() {
    const app = AppSingleton_1.AppSingleton.getInstance();
    await app.start();
}
bootstrap();
