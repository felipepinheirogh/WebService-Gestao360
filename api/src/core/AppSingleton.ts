import express, { Application } from "express";
import { createServer, Server } from "http";
import path from "path";
import routes from "../routes";

export class AppSingleton {
  private static instance: AppSingleton;
  private app: Application;
  private server: Server;

  private constructor() {
    this.app = express();
    this.server = createServer(this.app);

    // Middleware base
    this.app.use(express.json());

    // API
    this.app.use("/api", routes);

    // Caminhos do frontend
    const webPath = path.join(__dirname, "../../..", "web");
    const publicPath = path.join(webPath, "public");
    const viewsPath = path.join(webPath, "views");

    // Arquivos estáticos (css, js, imagens)
    this.app.use(express.static(publicPath));

    // Views (HTML)
    this.app.use(express.static(viewsPath));

    // Página inicial: redireciona para login ou dashboard
    this.app.get("/", (_req, res) => {
      res.sendFile(path.join(viewsPath, "index.html"));
    });

    // Fallback SPA: qualquer rota que não seja /api/* retorna index.html
    this.app.get("*", (_req, res) => {
      res.sendFile(path.join(viewsPath, "index.html"));
    });
  }

  public static getInstance(): AppSingleton {
    if (!AppSingleton.instance) {
      AppSingleton.instance = new AppSingleton();
    }
    return AppSingleton.instance;
  }

  public async start(): Promise<void> {
    const port = process.env.PORT || 3000;
    this.server.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  }
}

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

//     // Caminhos do frontend
//     const webPath = path.join(__dirname, "../../..", "web");
//     const publicPath = path.join(webPath, "public");
//     const viewsPath = path.join(webPath, "views");

//     // Arquivos estáticos (css, js, imagens)
//     this.app.use(express.static(publicPath));

//     // Views (HTML)
//     this.app.use(express.static(viewsPath));

//     // Fallback: qualquer rota que não seja /api/* retorna index.html
//     this.app.get("*", (_req, res) => {
//       res.sendFile(path.join(viewsPath, "index.html"));
//     });
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

// // import express, { Application } from "express";
// // import { createServer, Server } from "http";
// // import path from "path";
// // import routes from "../routes";

// // export class AppSingleton {
// //   private static instance: AppSingleton;
// //   private app: Application;
// //   private server: Server;

// //   private constructor() {
// //     this.app = express();
// //     this.server = createServer(this.app);

// //     // Middleware base
// //     this.app.use(express.json());

// //     // API
// //     this.app.use("/api", routes);

// //     // Servir frontend estático
// //     const webPath = path.join(__dirname, "../../..", "web");
// //     this.app.use(express.static(webPath + "/public"));
// //     this.app.use("/", express.static(webPath + "/views"));
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
// //       console.log(`✅ Server running on http://localhost:${port}`);
// //     });
// //   }
// // }


// // // // Padrao Singleton para a aplicacao 
// // // import express, { Application } from "express";
// // // import { createServer, Server } from "http";
// // // import routes from "../routes";

// // // export class AppSingleton {
// // //   private static instance: AppSingleton;
// // //   private app: Application;
// // //   private server: Server;

// // //   private constructor() {
// // //     this.app = express();
// // //     this.server = createServer(this.app);

// // //     this.app.use(express.json());
// // //     this.app.use("/api", routes);
// // //   }

// // //   public static getInstance(): AppSingleton {
// // //     if (!AppSingleton.instance) {
// // //       AppSingleton.instance = new AppSingleton();
// // //     }
// // //     return AppSingleton.instance;
// // //   }

// // //   public async start(): Promise<void> {
// // //     const port = process.env.PORT || 3000;
// // //     this.server.listen(port, () => {
// // //       console.log(`✅ API running on port ${port}`);
// // //     });
// // //   }
// // // }
