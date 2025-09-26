// Ponto de entrada (Entry Point) da API 
import { AppSingleton } from "./core/AppSingleton";

async function bootstrap() {
  const app = AppSingleton.getInstance();
  await app.start();
}

bootstrap();
