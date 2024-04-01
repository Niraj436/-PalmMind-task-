import express from "express"
import User from "../models/userModel.js"
import { getallusers } from "../controllers/userController.js"

const router = express.Router()

router.get("/", getallusers)

export default router