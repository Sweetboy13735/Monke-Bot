/**
 * Represents the core of the bot.
 * When the main program starts executing, this script is responsible for handling the bot's main functions.
 * @author Ramone Graham
 */
// Initialise dotenv
require("dotenv").config();

// External package imports
const fileSystem = require("node:fs");
const path = require("node:path");
const { Client, Intents, Collection } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Reading files
const commandsPath = path.join(__dirname, "commands"), eventsPath = path.join(__dirname, "events");
const commandFiles = fileSystem.readdirSync(commandsPath).filter(file => file.endsWith(".js")), eventFiles = fileSystem.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

// Register commands
client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(path.join(commandsPath, file));

	client.commands.set(command.data.name, command);
}

// Register event callbacks
for (const file of eventFiles) {
	const event = require(path.join(eventsPath, file));

	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else client.on(event.name, (...args) => event.execute(...args));
}

// Login to Discord using the bot token
client.login(process.env.TOKEN);
