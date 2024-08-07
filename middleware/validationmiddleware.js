import { body, param,validationResult } from 'express-validator';
import { BadRequestError,NotFoundError, UnauthorizedError } from '../errors/customError.js';
import mongoose from 'mongoose';
import Task from '../models/task.js'
import User from '../models/UserModel.js'
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no job')){
            throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')){
        throw new UnauthorizedError('not authorized');
        }
         throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};


//this is the validation which we can use for code to code.
export const validatetaskInput = withValidationErrors([
  body('task').notEmpty().withMessage('task is required')
]);

//validation for the ID coming from mongo DB.
export const ValidateIdparam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid MongoDB id');
    const task = await Task.findById(value);
    if (!task) throw new NotFoundError(`no job with id : ${value}`);
    // //checking normal user cannot access the id of the admin
    // const isAdmin = req.user.role === 'admin';
    // const isOwner = req.user.userId === job.createdBy.toString()
    // if(!isAdmin && !isOwner){
    //   throw new UnauthorizedError('not authorized to access this route')
    // }
  }),
]);


//this is the validation which we can use for code to code.
export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastname').notEmpty().withMessage('last name is required'),
]);


export const validateLoginInput = withValidationErrors([
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);


export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format')
    .custom(async (email, { req }) => {
      //here checking if we are updating the user with the same value again
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);