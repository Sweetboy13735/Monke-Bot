/**
 * Represents the application command deployment script of the bot.
 * When this program is executed, this script is responsible for handling the registration of the bot's current list of commands to the Discord API.
 * @author Ramone Graham
 */
// Initialise dotenv
require("dotenv").config();

// External package imports
const fileSystem = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// Local module imports
const { guildID } = require("./config.json");

// Collect all existing application commands
const commands = [], commandsPath = path.join(__dirname, "commands"), commandFiles = fileSystem.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(path.join(commandsPath, file));

	commands.push(command.data.toJSON());
}

// Login to Discord using the bot token
const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

// Register the commands to the Discord API
(async () => {
	console.log("Registering application guild commands...");

	try {
		const application = await rest.get(Routes.oauth2CurrentApplication());

		await rest.put(Routes.applicationGuildCommands(application.id, guildID), { body: commands });

		console.log("Application guild command registration successful!");
	} catch (error) {
		console.error(error);
	}
})();
