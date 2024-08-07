import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js'
import { hashPassword,comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { createJWT } from "../utils/tokenUtils.js";
//register
export const register = async (req,res)=>{
    
    req.body.role = 'user';
    //here hashed password
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  //finally creating the user
    const user  = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:"user created"});
};


//login
export const login = async (req,res)=>{
    //for login checking if the mail is correct or not.
    const user = await User.findOne({email:req.body.email})
    if (!user){
        throw new UnauthenticatedError('invalid credentials')
    }
    //comparing password from register and login password.
    const IsPasswordCorrect = await comparePassword(req.body.password,user.password)
    if (!IsPasswordCorrect){
        throw new UnauthenticatedError('invalid credentials')
    }

    const token = createJWT({userId:user._id,role:user.role});
    const oneDay = 1000 * 60 * 60 * 24;

res.cookie('token', token, {
  httpOnly: true,
  expires: new Date(Date.now() + oneDay),
  secure: process.env.NODE_ENV === 'production',
});
  res.status(StatusCodes.OK).json({msg:'user logged in'});
};

//logout
export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};