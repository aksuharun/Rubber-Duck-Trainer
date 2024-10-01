import OpenAI from "openai/index.mjs"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function callOpenAI(systemInstruction, message, options = {}) {
	options.model = options.model || "gpt-4o-mini"
	options.temperature = options.temperature || 1
	options.max_tokens = options.max_tokens || 1
	options.top_p = options.top_p || 1
	options.frequency_penalty = options.frequency_penalty || 0
	options.presence_penalty = options.presence_penalty || 0
	options.response_format = options.response_format || { type: "text" }

	const response = await openai.chat.completions.create({
		model: options.model,
		messages: [
			{ role: "system", content: [{ type: "text", text: systemInstruction }]},
			{ role: "user", content: [{ type: "text", text: message }]}
		],
		temperature: options.temperature,
		max_tokens: options.max_tokens,
		top_p: options.top_p,
		frequency_penalty: options.frequency_penalty,
		presence_penalty: options.presence_penalty,
		response_format: options.response_format,
	})
	return response.choices[0].message.content
}

async function isMessageVague(message) {
	const systemInstruction = "Senin amacın bir topluluğun yardım kısmında sorulan soruları incelemek ve eğer soru yeterince açıklanmamışsa 1 yazmak. Eğer soru yeterince açıklandıysa 0 yazmak.\n\nÖrnekler\n\nMesaj: Javascript bilen var mı?\nSenin Yanıtın: 1\n\nMesaj: Node.js projemde fs ile dosya okumaya çalışıyorum ama ENOENT hatası alıyorum. Dosya yolunu nasıl düzeltebilirim?\nSenın Yanıtın: 0"

	const response = await callOpenAI(systemInstruction, message)
	return response === "1"
}

async function generateWarningMessage(message) {
	const systemInstruction = "Senin amacın bir yazılım topluluğunun yardım kanalında yazılan, yeterince iyi açıklanmamış sorular için kullanıcıyı sorununu daha iyi açıklamaya teşvik eden kibar bir mesaj hazırlamak.\n\nAşağıdaki uyarıları dikkate al:\n- Kibar ve arkadaş canlısı olmalısın\n- ﻿Kısa ve anlaşılır bir mesaj oluşturmalısın"
	const response = await callOpenAI(systemInstruction, message, { max_tokens: 100 })
	return response
}

async function processMessage(message) {
	if(await isMessageVague(message)) {
		return generateWarningMessage(message)
	}
	return "0"
}

export default processMessage