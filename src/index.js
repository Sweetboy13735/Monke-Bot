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

// Register commands
client.commands = new Collection();

const commandFiles = fileSystem.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.data.name, command);
}

// Register event callbacks
client.once("ready", () => {
	console.log("Ready!");
});

client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);

		await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
	}
});

// Login to Discord using the bot token
client.login(process.env.TOKEN);
