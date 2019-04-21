import {AppService} from "./service/AppService";

let appService = new AppService();

export const app = appService.app;
export const server = appService.server;
