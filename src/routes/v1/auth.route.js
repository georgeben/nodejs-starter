import { Router } from "express";
import { makeInvoker } from "awilix-express";
import validator from "express-joi-validation";
import MethodNotAllowedHandler from "../../middleware/methodNotAllowed";
import { loginSchema } from "../../validations/auth.schema";
import AuthController from "../../controllers/AuthController";
import catchErrors from "../../middleware/catchErrors";

const router = Router();

const validate = validator.createValidator({
  passError: true,
});
const api = makeInvoker(AuthController);

router
  .route("/login")
  .post(
    validate.body(loginSchema),
    catchErrors(api("login")),
  )
  .all(MethodNotAllowedHandler);

export default router;
