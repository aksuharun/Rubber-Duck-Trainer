import { Events } from "discord.js"
import axios from "axios"

const name = Events.MessageCreate
const once = false

async function execute(message) {
	// Skip if message is from a bot
	if (message.author.bot) return
	
	const messageContent = message.content.trim()
	const messageLength = messageContent.length
	
	// Check if message should be processed based on new criteria
	const shouldProcess = (
		// Process if message has less than 100 characters
		messageLength < 100 ||
		// OR if message contains question mark and less than 250 characters
		(messageContent.includes('?') && messageLength < 250)
	)
	
	if (shouldProcess) {
		const response = await fetchResponseContent(messageContent)
		if (response == "0") return
		message.reply(response)
	}
}

async function fetchResponseContent(message) {
	try {
		const response = await axios.post('http://localhost:3000/gpt/analyze-message', { message })
		return response.data
	} catch (error) {
		console.error('Error fetching response content:', error)
		return '0'
	}
}

export { name, once, execute }
