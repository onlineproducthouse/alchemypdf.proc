import { NextFunction, Request, Response } from "express";

export default function ApiKeyValidator() {
  const apiKeyList = ["a599ace8-d08e-4b6f-9c53-a31e30c110d6"]

  return function (req: Request, res: Response, next: NextFunction) {
    const apiKey = req.get("x-api-key")

    if (!apiKey) return res.status(400).send({
      statusCode: 400,
      message: "api key must be provided in request header",
    })


    if (apiKeyList.findIndex(key => key === apiKey) <= -1) return res.status(401).send({
      statusCode: 401,
      message: "invalid api key provided",
    })


    return next()
  }
}