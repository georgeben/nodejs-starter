"use strict";

import HttpStatus from "http-status-codes";
import BaseError from "./base";

class ResourceNotFoundError extends BaseError {
  constructor(
    message = "You have attempted to access an API endpoint that does not exist.",
    status = HttpStatus.NOT_FOUND,
    data,
  ) {
    super(message, status, data);
    this.name = "ResourceNotFoundError";
  }
}
export default ResourceNotFoundError;
