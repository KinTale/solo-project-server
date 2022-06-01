import { Router } from "express";
import { inventoryList, addItem, editItem, deleteItem} from "../controller/inventory.js";
import { validateAuth } from "../middleware/auth.js";
const router = Router()

router.get('/', inventoryList)
router.post('/additem', validateAuth, addItem)
router.patch('/edititem',validateAuth, editItem )
router.delete('/delete/:itemId', validateAuth, deleteItem)
export default router