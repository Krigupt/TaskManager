import {Router} from "express";
const router = Router()

import {login,register,logout} from "../controllers/authcontroller.js"
import {validateRegisterInput,validateLoginInput} from '../middleware/validationmiddleware.js'

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

export default router;