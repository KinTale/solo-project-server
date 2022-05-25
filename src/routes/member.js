import { Router } from "express";
import { addMember } from "../controller/member.js";
import { validateAuth } from "../middleware/auth.js";
const router = Router()

router.post('/addmember', validateAuth, addMember )
export default router