import { Client, Collection, GatewayIntentBits } from 'discord.js'

import dotenv from 'dotenv'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readdir } from 'fs/promises'

globalThis.test = { a: 1 }

dotenv.config()

const client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.MessageContent] })

client.cooldowns = new Collection()
client.commands = new Collection()


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


// Command handler
const commandsFolder = join(__dirname, 'commands')
const commandsFolders = await readdir(commandsFolder)

await Promise.all(commandsFolders.map(async (folder) => {
	const commandsPath = join(commandsFolder, folder)
	const commandFiles = (await readdir(commandsPath)).filter(file => file.endsWith('.js'))

	await Promise.all(commandFiles.map(async (file) => {
		const filePath = join(commandsPath, file)
		const command = await import(filePath)
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command)
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
		}
	}))
}))

const eventsPath = join(__dirname, 'events')
const eventsFolders = await readdir(eventsPath, { withFileTypes: true })

let eventsFiles = []

// Get all folders and files in the events folder
await Promise.all(eventsFolders.map(async (folder) => {
	if (folder.isDirectory()) {
		const folderPath = join(eventsPath, folder.name)
		const files = (await readdir(folderPath)).filter(file => file.endsWith('.js'))
		eventsFiles = eventsFiles.concat(files.map(file => join(folderPath, file)))
	}
}))

// Get all files in the root of the events folder
const rootFiles = (await readdir(eventsPath)).filter(file => file.endsWith('.js'))
eventsFiles = eventsFiles.concat(rootFiles.map(file => join(eventsPath, file)))

// Import and register events
await Promise.all(eventsFiles.map(async (file) => {
	const event = await import(file)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args))
	} else {
		client.on(event.name, (...args) => event.execute(...args))
	}
}))

client.login(process.env.DISCORD_BOT_TOKEN)