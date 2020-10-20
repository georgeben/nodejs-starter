import toobusy from "toobusy-js";
import ServiceUnavailableError from "../errors/serverUnavailable";

export default (req, res, next) => {
  if (toobusy()) {
    throw new ServiceUnavailableError();
  }
  next();
};
