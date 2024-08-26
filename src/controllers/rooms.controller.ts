import { NextFunction, Request, Response } from "express";

class RoomsController {
  public getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId: number = parseInt(req.params.id);

      res.status(200).json({ data: { roomId }, message: "found" });
    } catch (error) {
      next(error);
    }
  };
}

export default RoomsController;
