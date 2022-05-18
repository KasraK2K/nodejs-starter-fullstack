import "./boot";
import { app, express } from "./boot";
import helmet from "helmet";
import compression from "compression";
import session from "express-session";
import MongoStore from "connect-mongo";
import _ from "lodash";
import { locals, globals } from "./common/variabels";
import router from "./router";
import rateLimiterMiddleware from "./middleware/RateLimiterMiddleware";
import multipartMiddleware from "./middleware/MultipartMiddleware";
import requestMiddleware from "./middleware/RequestMiddleware";
import { getUserInformation } from "./common/logic/information";
import { useExpressServer } from "routing-controllers";
import path from "path";
import config from "config";
import { IMongodbConfig } from "./../config/config.interface";

const mongodbConfig: IMongodbConfig = config.get("database.mongodb");

/**
 * # Application
 * ---
 *
 * This class is core of the application. It is responsible for starting the server and handling the requests. To use this class, you need to create an instance of it. The constructor takes an object has port as a number.
 *
 * ```typescript
 * // This is an example of how to use the Application class.
 *
 * const server = new Application();
 * server.start({ port: 3000 });
 * ```
 *
 * @category Application
 */
class Application {
  private port: number;

  /**
   * @param options Get some options to constructing core class
   */
  constructor(options: { port: number }) {
    const { port } = options;
    this.port = Number(process.env.PORT) || port;

    this.config();
    this.middlewares();
    this.routes();
  }

  private config() {
    app.locals = locals;
    _.assign(global, globals);

    app.set("view engine", "pug");
    app.set("views", "./src/views");
    app.set("view cache", process.env.NODE_ENV === "production");
    app.set("public", "./src/public");
  }

  private middlewares() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(compression());
    app.use(rateLimiterMiddleware.check());
    app.use(multipartMiddleware.extendBody);
    app.use(requestMiddleware.processIdAdder);
    app.use(
      session({
        secret: process.env.SESSION_SECRET || "secret",
        store: MongoStore.create({ mongoUrl: mongodbConfig.uri, collectionName: "sessions" }),
        resave: false,
        saveUninitialized: true,
        cookie: { path: "/", httpOnly: true, secure: false },
      })
    );
    app.use("static", express.static(path.join(process.cwd(), "/src/public/static")));
    app.disable("x-powered-by");
  }

  private routes() {
    app.use("/api", router);
    useExpressServer(app, {
      controllers: [path.join(process.cwd(), "/src/controller/**/*.ts")],
      middlewares: [path.join(process.cwd(), "/src/middleware/**/*.ts")],
      interceptors: [path.join(process.cwd(), "/src/interceptor/**/*.ts")],
    });
  }

  public start() {
    app.listen(this.port, () => getUserInformation(this.port));
  }
}

export default Application;
