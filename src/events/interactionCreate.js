/**
 * Represents the event callback for the "interactionCreate" event.
 * When the event is emitted, this file is responsible for handling any tasks that take place when an interaction is created.
 * @author Ramone Graham
 */
// Module exports
module.exports = {
	// Event name
	name: "interactionCreate",

	// Event execution
	async execute(commands, interaction) {
		if (!interaction.isCommand()) return;

		const command = commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);

			await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
		}
	}
};
