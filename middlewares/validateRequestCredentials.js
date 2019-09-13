import Validator from 'validatorjs';

Validator.register(
  'array_string',
  value =>
    Array.isArray(value)
      ? value.every(each => typeof each === 'string')
      : false,
  'this field only accept array of strings',
);

const errorMessages = {
  required: 'this field is required',
  alpha: 'this field can only be alphabets',
  email: 'your email is not valid',
  min: 'this field should be at least eight characters long',
  alpha_num: 'this field should contain alphabets and numbers',
  numeric: 'this field can only be numeric characters',
  string: 'this field should be a string',
  url: 'the url parsed is not valid',
};

const validateRequestCredentials = (req, res, next, rule) => {
  const validation = new Validator(req.body, rule, errorMessages);
  if (validation.passes()) {
    return next();
  }
  const errors = validation.errors.all();
  return res.status(400).json({
    message: 'Invalid Credentials',
    errors,
  });
};

export const validateRegistrationCredentials = (req, res, next) => {
  const rule = {
    firstName: 'required|alpha',
    lastName: 'required|alpha',
    userName: 'required|min:3',
    email: 'required|email',
    password: 'required|min:8|alpha_num',
  };
  return validateRequestCredentials(req, res, next, rule);
};

export const validateSignInCredentials = (req, res, next) => {
  const rule = {
    email: 'required|email',
    password: 'required|min:8|alpha_num',
  };
  return validateRequestCredentials(req, res, next, rule);
};
