/**
 * Represents the core of the bot.
 * When the main program starts executing, this file is responsible for handling the bot's main functions.
 * @author Ramone Graham
 */
// Initialise dotenv
require("dotenv").config();

// External package imports
const { Client, Intents } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Event callbacks
client.once("ready", () => {
	console.log("Ready!");
});

// Login to Discord using the bot token
client.login(process.env.TOKEN);
