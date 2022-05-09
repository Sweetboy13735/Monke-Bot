/**
 * Temporary command to test slash command deployment.
 * @author Ramone Graham
 */
// External package imports
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	// Slash command data
	data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),

	// Command execution
	async execute(interaction) {
		await interaction.reply("Pong!");
	}
};