import { v4 as uuid } from "uuid"
export default function RequestIdGenerator() {
  return function (_req: any, res: any, next: any) {
    res.header("x-request-id", uuid())
    return next()
  }
}