/**
 * Represents the event callback for the "ready" event.
 * When the event is emitted, this script is responsible for handling any tasks that take place when the bot connects to Discord.
 * @author Ramone Graham
 */
// Local module imports
const { readyMessage } = require("../config.json");

// Module exports
module.exports = {
	// Event name
	name: "ready",

	// Whether this is a one-time event
	once: true,

	// Event execution
	async execute() {
		console.log(readyMessage);
	}
};