import { StatusCodes } from "http-status-codes";

//this is for handling the middleware
const errorHandlerMiddleware = (err,req,res,next)=>{
    console.log(err);
    const statusCode = err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const msg = err.message || 'something went wrong'
    res.status(statusCode).json({msg});
};



export default errorHandlerMiddleware;