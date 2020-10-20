"use strict";

import HttpStatus from "http-status-codes";
import BaseError from "./base";

class MethodNotAllowedError extends BaseError {
  constructor(
    message = "Method not allowed",
    status = HttpStatus.METHOD_NOT_ALLOWED,
    data,
  ) {
    super(message, status, data);
    this.name = "MethodNotAllowedError";
  }
}

export default MethodNotAllowedError;
