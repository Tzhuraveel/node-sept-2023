import * as Joi from "joi";

import { regexConstants } from "../constant";
import { EGenders } from "../types/User.types";

export class UserValidator {
  private static firstName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .max(50)
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGenders));

  public static createUser = Joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    gender: this.gender.required(),
  });

  public static updateUser = Joi.object({
    name: this.firstName,
    gender: this.firstName,
  });
}
