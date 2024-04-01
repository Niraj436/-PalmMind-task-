import express from "express"
import { getUser, getallusers } from "../controllers/userController.js"

const router = express.Router()

router.get("/", getallusers)
router.get("/:id", getUser)

export default router