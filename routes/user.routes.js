import express from "express"
import Router from "express"
import {registerUser,loginUser,logoutUser} from "../controllers/user.controller.js"

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)

export default router