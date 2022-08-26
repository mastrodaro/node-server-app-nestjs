import * as Joi from "joi";

export const configSchema = Joi.object({
  APP_PORT: Joi.number().default(3030).required(),
  JWT_SECRET: Joi.string().required(),
});
