//=========================================================================================================================
//
//   ####  ######    ###    #####    ######  #####  #####           ####   #####   ##     ##  #####  ##   ####     ####
//  ##       ##     ## ##   ##  ##     ##    ##     ##  ##         ##     ##   ##  ####   ##  ##     ##  ##       ##
//   ###     ##    ##   ##  #####      ##    #####  #####          ##     ##   ##  ##  ## ##  #####  ##  ##  ###   ###
//     ##    ##    #######  ##  ##     ##    ##     ##  ##         ##     ##   ##  ##    ###  ##     ##  ##   ##     ##
//  ####     ##    ##   ##  ##   ##    ##    #####  ##   ##         ####   #####   ##     ##  ##     ##   ####    ####
//
//=========================================================================================================================

import fs from "fs";
import path from "path";
import config, { IConfig } from "config";

const configs: IConfig = config.util.toObject();

export default {
  boot: [
    "envirement",
    // "cron-jobs",
    // "mongodb",
    /*"mongoose",*/
    // "postgresql",
    // "firebase",
    // "information",
    // "treblle",
  ],
  swagger: {
    enabled: true,
    endpoint: "/swagger",
    options: {
      explorer: true,
      swaggerOptions: { validatorUrl: null },
      customCss: fs.readFileSync(path.resolve(process.cwd(), "src/swagger/css/feeling-blue.css"), "utf8"),
    },
  },
};
