import { Events } from "discord.js"
import axios from "axios"

const name = Events.MessageCreate
const once = false

async function execute(message) {
	if (message.content.match(/var[ ]{0,2}m[iı]/i)) { 
		if(message.author.bot) return
		const response = await fetchResponseContent(message.content)
		if(response == "0") return
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
