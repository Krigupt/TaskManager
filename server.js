//this we use so that we do not have to make the try and catch block every time
import 'express-async-errors';
import { fileURLToPath } from 'url';
import taskRouters from "./router/taskrouter.js";
import path from 'path';
//this is for enviroment
import * as dotenv from 'dotenv';
dotenv.config();
//this is for database
import mongoose from 'mongoose'
import express from 'express';
import morgan from 'morgan';
import errorHandlerMiddleware from './middleware/errorhandlermiddleware.js';
import {authenticateUser} from "./middleware/authmiddleware.js"
import authrouter from "./router/auth.js";
import userRouter from "./router/userRouter.js";
import cookieParser from 'cookie-parser';
const app = express();

// Convert __filename and __dirname to work in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.json());

app.use(express.static(path.resolve(__dirname,'./public')))

app.get('/', (req, res) => {
    res.send('hello world');
});

// ENV
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}




app.use('/api/v1/jobs',authenticateUser,taskRouters);
app.use('/api/v1/users',authenticateUser,userRouter);
app.use('/api/v1/auth',authrouter);




app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'./public','index.html'))
})


//middleware for none of the routes found
app.use('*',(req,res)=>{
    res.status(404).json({msg:"msg not found"});
})


//error middleware is used to trigger the error from the existing route.
app.use(errorHandlerMiddleware);



//this is the port
const port = process.env.PORT || 5300;

//database connection using mongoose
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
