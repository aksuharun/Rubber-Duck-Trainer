import OpenAI from "openai"
import dotenv from "dotenv"
import { VAGUENESS_CHECK_PROMPT, WARNING_MESSAGE_PROMPT } from '../prompts/index.js'

dotenv.config()

const defaultModel = "gpt-4.1-nano"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

async function callOpenAI(systemInstruction, message, options = {}) {
	const config = {
		model: defaultModel,
		temperature: 1,
		max_completion_tokens: 150,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		response_format: { type: "text" },
		...options
	};

	const response = await openai.chat.completions.create({
		...config,
		messages: [
			{
				role: "system",
				content: [{ type: "text", text: systemInstruction }]
			},
			{
				role: "user",
				content: [{ type: "text", text: message }]
			}
		]
	})
	    
	// Adjust response parsing based on the new API structure
	return response.choices[0].message.content || response.text
}

async function isMessageVague(message) {
	const response = await callOpenAI(VAGUENESS_CHECK_PROMPT, message)
	return response === "1"
}

async function generateWarningMessage(message) {
	const response = await callOpenAI(WARNING_MESSAGE_PROMPT, message, { max_completion_tokens: 100 })
	return response
}

async function processMessage(message) {
	if(await isMessageVague(message)) {
		return generateWarningMessage(message)
	}
	return "0"
}

export default processMessage