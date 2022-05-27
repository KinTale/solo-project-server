import { Router } from "express";
import { addMember, allMembers, deleteMember } from "../controller/member.js";
import { validateAuth } from "../middleware/auth.js";
const router = Router()

router.get('/memberlist', allMembers)
router.post('/addmember', validateAuth, addMember)
router.delete('/delete/:adminId', validateAuth, deleteMember)
export default router