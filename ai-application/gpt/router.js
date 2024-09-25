import { Router } from "express"
import generateWarningMessage from "./service.js"

const router = Router()

router.post("/var-mi", async (req, res) => {
	try {
		const { message } = req.body
		const response = await generateWarningMessage(message)
		res.json(response)
	} catch (error) {
		console.error('Error generating warning message:', error)
		res.status(500).json({ error: 'An error occurred while processing your request' })
	}
})

export default router