import { Events } from 'discord.js'

const name = Events.ClientReady
const once = true

async function execute(client) {
	console.log(`Ready! Logged in as ${client.user.tag}`)
}

export { name, once, execute }