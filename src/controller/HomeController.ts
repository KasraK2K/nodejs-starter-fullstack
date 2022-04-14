import { Request, Response } from "express";
import { Controller, Req, Res, Get, Render } from "routing-controllers";

@Controller()
export class HomeController {
  @Get("/")
  @Render("index")
  home() {
    return {
      param1: "<pre>some scape</pre>",
      param2: "<pre>some unscape</pre>",
    };
  }
}

export default HomeController;
