"use strict";

import HttpStatus from "http-status-codes";
import BaseError from "./base";

class ServiceUnavailableError extends BaseError {
  constructor(
    message = "Sorry, the server is too busy to process your request at the moment.",
    status = HttpStatus.SERVICE_UNAVAILABLE,
    data,
  ) {
    super(message, status, data);
    this.name = "ServiceUnavailableError";
  }
}

export default ServiceUnavailableError;
