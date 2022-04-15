//====================================================================================================================
//
//  #####  ##    ##  ######  #####  ##     ##  ####          #####  ##    ##  #####   #####    #####   ####   ####
//  ##      ##  ##     ##    ##     ####   ##  ##  ##        ##      ##  ##   ##  ##  ##  ##   ##     ##     ##
//  #####    ####      ##    #####  ##  ## ##  ##  ##        #####    ####    #####   #####    #####   ###    ###
//  ##      ##  ##     ##    ##     ##    ###  ##  ##        ##      ##  ##   ##      ##  ##   ##        ##     ##
//  #####  ##    ##    ##    #####  ##     ##  ####          #####  ##    ##  ##      ##   ##  #####  ####   ####
//
//====================================================================================================================

import "express-session";

declare module "express-session" {
  interface SessionData {
    visitCount?: number;
    process_id?: string;
  }
}

// declare namespace Express {
//   export interface Request {
//     // add custom property like key: string
//   }

//   export interface Response {
//     // add custom property like key: string
//   }
// }
