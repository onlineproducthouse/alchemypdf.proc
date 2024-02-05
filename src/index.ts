import express, { Express, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv"
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3000", 10)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/convert', (req: Request, res: Response, _next: NextFunction) => {
  res.json(req.body);
});

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log(error)
  res.json(req.body);
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});