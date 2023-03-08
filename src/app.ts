import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs/configs";
import { userRouter } from "./routers/users.router";
import { IError } from "./types/common.types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  return res.status(err.status).json({
    message: err.message,
    status: err.status,
  });
});

app.listen(configs.PORT, () => {
  mongoose
    .connect(configs.DB_URL)
    .then(() => console.log(`Server is Started ${configs.PORT}`));
});
