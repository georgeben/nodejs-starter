import Joi from "@hapi/joi";
import { email, password } from ".";

export const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});
