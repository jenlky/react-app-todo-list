import "./utils/db";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/user.route";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
app.use(userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send(err);
});

export default app;
