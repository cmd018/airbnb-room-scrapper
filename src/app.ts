import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import { NODE_ENV, ORIGIN, PORT } from "./config";
import { Routes } from "./types";
import errorMiddleware from "./middlewares/error.middleware";

class App {
  public app: express.Application;

  public env: string;

  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info("---------------------------------------------------");
      console.info(`ENV: ${this.env} listening on the port ${this.port}`);
      console.info("---------------------------------------------------");
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    // Enable CORS with options
    this.app.use(cors({ origin: ORIGIN, credentials: false }));

    // hpp protect against HTTP Parameter Pollution attacks
    this.app.use(hpp());

    // to isolate origins from other processes
    this.app.use(helmet());

    // compress response bodies for all request
    this.app.use(compression());

    // to parse incoming JSON data from HTTP requests
    this.app.use(express.json());

    // parses incoming requests with URL-encoded payloads
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
