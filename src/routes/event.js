import { Router } from "express";
import { getEvent, createEvent } from "../controller/event.js";
import { validateAuth } from "../middleware/auth.js";
const router = Router()

router.get('/', getEvent)
router.post('/addevent', createEvent)

export default router