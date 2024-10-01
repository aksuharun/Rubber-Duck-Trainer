import { Router } from "express"
import processMessage from "./service.js"

const router = Router()

router.post("/analyze-message", async (req, res) => {
	try {
		const { message } = req.body
		const response = await processMessage(message)
		res.json(response)
	} catch (error) {
		console.error('Error generating warning message:', error)
		res.status(500).json({ error: 'An error occurred while processing your request' })
	}
})

export default router