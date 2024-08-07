import Task from '../models/task.js';
import { StatusCodes } from 'http-status-codes';


export const getAlltasks = async (req, res) => {
  const { task,completed } = req.query;

  // Create a query object
  const queryObject = {
    createdBy: req.user.userId,
  };

  // Add the search parameter to the query object if provided
  if (task) {
    queryObject.task = { $regex: task, $options: 'i' }; // Use regular expression for case-insensitive search
  }

  // Handle the completed parameter
 if (completed === 'true' || completed === 'false') {
    queryObject.completed = completed === 'true';
  }

  try {
    // Fetch tasks based on the query object
    const tasks = await Task.find(queryObject);
    res.status(StatusCodes.OK).json({ tasks });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error fetching tasks' });
  }
};


//creating the jobs
export const createtask = async (req,res)=>{
  req.body.createdBy=req.user.userId
  const task = await Task.create(req.body)
  res.status(StatusCodes.CREATED).json({ task}); 
};



//route for geting the job
export const gettask = async (req,res)=>{
    const task = await Task.findById(req.params.id);
    res.status(StatusCodes.OK).json({task});
};

//route for updating the job
export const Updatetask = async (req,res)=>{
  const updatedtask = await Task.findByIdAndUpdate(req.params.id,req.body,{
    new:true
  });
  res.status(StatusCodes.OK).json({ msg: 'Job modified', task:updatedtask });
};


//route for deleting the job
export const deletetask = async (req,res)=>{
  const removetask = await Task.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'Job deleted',task:removetask});
};

