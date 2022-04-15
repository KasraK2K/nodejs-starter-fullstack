import { Request } from "express";
import { Controller, Req, Res, Get, Render } from "routing-controllers";

@Controller()
export class HomeController {
  @Get("/")
  @Render("index")
  home(@Req() request: Request) {
    const session = request.session;
    session.visitCount ? session.visitCount++ : (session.visitCount = 1);

    return {
      param1: "<pre>some scape</pre>",
      param2: "<pre>some unscape</pre>",
      visitCount: session.visitCount,
    };
  }
}

export default HomeController;
