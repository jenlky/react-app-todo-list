const Joi = require("@hapi/joi");

const signupSchema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .required(),
  username: Joi.string()
    .alphanum()
    .min(4)
    .max(20)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .regex(/[a-zA-Z0-9~!@#$%^&*()]{8,30}$/)
    .required()
});

// how to make it so that only either username or email is required
const loginSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(4)
    .max(20)
    .required(),
  // email: Joi.string()
  //   .email({ minDomainSegments: 2 })
  //   .required(),
  password: Joi.string()
    .regex(/[a-zA-Z0-9~!@#$%^&*()]{8,30}$/)
    .required()
});

module.exports = {
  signupSchema,
  loginSchema
};
