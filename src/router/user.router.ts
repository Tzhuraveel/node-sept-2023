import { Router } from "express";

import { userController } from "../controller/user.controller";
import { userMiddleware } from "../middleware/user.middleware";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.post("/", userMiddleware.isUserValidatorCreate, userController.create);

router.get(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdHandlerError,
  userController.getById
);

router.put(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.isUserValidUpdate,
  userMiddleware.getByIdHandlerError,
  userController.update
);

router.delete(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdHandlerError,
  userController.delete
);
