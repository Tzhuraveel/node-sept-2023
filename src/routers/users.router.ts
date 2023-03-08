import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.get(
  "/:userId",
  userMiddleware.getByIdHandlerError,
  userController.getById
);

router.post("/", userMiddleware.createHandlerError, userController.create);

router.put(
  "/:userId",
  userMiddleware.updateHandlerError,
  userController.update
);

router.delete(
  "/:userId",
  userMiddleware.deleteHandlerError,
  userController.delete
);
