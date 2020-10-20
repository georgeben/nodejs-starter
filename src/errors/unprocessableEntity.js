"use strict";

import HttpStatus from "http-status-codes";
import BaseError from "./base";

class UnprocessableEntity extends BaseError {
  constructor(
    message = "Your request cannot be processed.",
    status = HttpStatus.UNPROCESSABLE_ENTITY,
    data,
  ) {
    super(message, status, data);
    this.name = "UnprocessableError";
  }
}

export default UnprocessableEntity;
