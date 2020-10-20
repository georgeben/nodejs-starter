import Joi from "@hapi/joi";

export const email = Joi.string()
  .trim()
  .email({ minDomainSegments: 2 });

export const password = Joi.string()
  .trim()
  .min(8);
