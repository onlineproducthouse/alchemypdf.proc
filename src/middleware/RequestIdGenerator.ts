import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid"

export default function RequestIdGenerator() {
  return function (_req: Request, res: Response, next: NextFunction) {
    res.header("x-request-id", uuid())
    return next()
  }
}