import express from "express"
import Router from "express"
import checkEmailSpam from "../controllers/email.controller.js"

const router = express.Router()

router.route("/emaildetection").post(checkEmailSpam)

export default router