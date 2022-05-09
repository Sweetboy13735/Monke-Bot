/**
 * Represents the application command deployment script of the bot.
 * When this program is executed, this file is responsible for handling the registration of the bot's current list of commands to the Discord API.
 * @author Ramone Graham
 */
// Initialise dotenv
require("dotenv").config();

// External package imports
const fileSystem = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// Local module imports
const { clientID, guildID } = require("./config.json");

// Collect all existing commands
const commands = [], commandFiles = fileSystem.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	commands.push(command.data.toJSON());
}

// Login to Discord using the bot token
const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

// Register the commands to a guild on the API
rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
