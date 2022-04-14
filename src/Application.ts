import "./boot";
import { app, express } from "./boot";
import helmet from "helmet";
import compression from "compression";
import _ from "lodash";
import { locals, globals } from "./common/variabels";
import router from "./router";
import rateLimiterMiddleware from "./middleware/RateLimiterMiddleware";
import { getUserInformation } from "./common/logic/information";
import { useExpressServer } from "routing-controllers";
import path from "path";

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

    const process_id = (+new Date() + Math.floor(Math.random() * (999 - 100) + 100)).toString(16);
    _.assign(global, { process_id });

    this.config();
    this.middlewares();
    this.routes();
  }

  private config() {
    app.locals = locals;
    _.assign(global, globals);

    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    app.set("view cache", process.env.NODE_ENV === "production");
    app.set("public", "./src/public");
  }

  private middlewares() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(helmet());
    app.use(compression());
    app.disable("x-powered-by");
    app.use(rateLimiterMiddleware.check());
  }

  private routes() {
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
