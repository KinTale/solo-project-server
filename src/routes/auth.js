import { Router } from "express";
import { login } from '../controller/auth.js'
import { addMember } from "../controller/member.js";
import { validateAuth } from "../middleware/auth.js";
const router = Router()

router.post('/login', login)
router.post('/addmember', validateAuth, addMember )
export default router