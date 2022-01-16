const { string, number } = require("joi");
const Joi = require("joi");

const campgroundFormValidation = Joi.object({
  name: Joi.string().min(3).max(30).required,
  location: string().min(3).max(30).required(),
  image: string().min(6).max(30),
  price: number(),
  description: string().min(3).max(30),
});
