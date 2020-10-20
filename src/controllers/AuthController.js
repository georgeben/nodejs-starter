/**
 * @module controllers/AuthController
 * @description Processes requests relating to authentication
 */

import { pick } from "lodash";
import BaseController from "./BaseController";

class AuthController extends BaseController {
  constructor({ authRepository }) {
    super();
    this.authRepository = authRepository;
  }

  /**
  * Authenticates a user using a challenge_token and password
  * @param {Object} req - Incoming request
  * @param {Object} res - Server response
  */
  async login(req, res) {
    const { email, password } = pick(req.body, ["email", "password"]);
    const response = await this.authRepository.login(email, password);
    return this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "Login successful", this.responseManager.HTTP_STATUS.OK);
  }
}

export default AuthController;
