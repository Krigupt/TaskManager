import {Router} from "express";
const router = Router()

import {getAlltasks,gettask,createtask,Updatetask,deletetask} from "../controllers/Taskcontrollers.js"

import {validatetaskInput,ValidateIdparam} from '../middleware/validationmiddleware.js'
import { get } from "mongoose";

router.route("/").get(getAlltasks).post(validatetaskInput,createtask)
router.route("/:id").get(ValidateIdparam,gettask).patch(validatetaskInput,ValidateIdparam,Updatetask).delete(ValidateIdparam,deletetask)




export default router;