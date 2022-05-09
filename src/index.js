/**
 * Represents the core of the bot.
 * When the main program starts executing, this file is responsible for handling the bot's main functions.
 * @author Ramone Graham
 */
// Initialise dotenv
require("dotenv").config();

// External package imports
const fileSystem = require("node:fs");
const { Client, Intents, Collection } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Reading files
const commandFiles = fileSystem.readdirSync("./src/commands").filter(file => file.endsWith(".js")), eventFiles = fileSystem.readdirSync("./src/events").filter(file => file.endsWith(".js"));

// Register commands
client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.data.name, command);
}

// Register event callbacks
for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else client.on(event.name, (...args) => event.execute(client.commands, ...args));
}

// Login to Discord using the bot token
client.login(process.env.TOKEN);
