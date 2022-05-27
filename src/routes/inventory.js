import { Router } from "express";
import { inventoryList, addItem} from "../controller/inventory.js";
import { validateAuth } from "../middleware/auth.js";
const router = Router()

router.get('/', inventoryList)
router.post('/additem', validateAuth, addItem)
// router.delete('/delete/:adminId', validateAuth, deleteMember)
export default router