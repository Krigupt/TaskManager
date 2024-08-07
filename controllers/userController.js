import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

//current user controller
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({_id:req.user.userId})
  //here this is for getting the user details without the password
  const userWithoutPassword = user.toJSON()
  res.status(StatusCodes.OK).json({user:userWithoutPassword});
};