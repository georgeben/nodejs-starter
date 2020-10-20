"use strict";

import HttpStatus from "http-status-codes";
import BaseError from "./base";

class BadGateway extends BaseError {
  constructor(
    message = "The action you specified could not be completed.",
    status = HttpStatus.BAD_GATEWAY,
    data,
  ) {
    super(message, status, data);
    this.name = "BadGateway";
  }
}

export default BadGateway;
