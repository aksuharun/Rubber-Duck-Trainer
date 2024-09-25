import { SlashCommandBuilder } from "discord.js"


const cooldown = 10

const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!')

async function execute (interaction) {
	await interaction.reply('Pong!')
}

export { data, execute, cooldown }