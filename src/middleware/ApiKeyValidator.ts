import { NextFunction, Request, Response } from "express";
import { Config } from "../config";

export default function ApiKeyValidator(config: Config) {
  return function (req: Request, res: Response, next: NextFunction) {
    const apiKey = req.get("x-api-key")

    if (!apiKey) return res.status(400).send({
      statusCode: 400,
      message: "api key must be provided in request header",
    })


    if (config.apiKeyList.findIndex(key => key === apiKey) <= -1) return res.status(401).send({
      statusCode: 401,
      message: "invalid api key provided",
    })


    return next()
  }
}