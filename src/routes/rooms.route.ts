import { Router } from "express";
import RoomsController from "../controllers/rooms.controller";
import { Routes } from "../types";

class RoomsRoute implements Routes {
  public path = "/rooms";

  public router = Router();

  public roomsController = new RoomsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.roomsController.getRoomById);
  }
}

export default RoomsRoute;
