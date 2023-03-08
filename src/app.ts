import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { User } from "./modules/User.module";

const app = express();

console.log(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL).then(() => console.log("MongoDB started"));
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(201).json(users);
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const user = req.body;

    console.log(user);
    const newUser = await User.create(user);

    res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
  }
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = req.body;

  console.log(userId);
  console.log(user);

  const updatedUser = await User.updateOne({ _id: userId }, user);

  res.status(201).json(updatedUser);
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  const deletedUser = await User.deleteOne({ _id: userId });

  res.status(200).json(deletedUser);
});
