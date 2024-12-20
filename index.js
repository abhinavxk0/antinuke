require("dotenv").config();
const Discord = require("discord.js");
require("discord-reply");
const client = new Discord.Client();

// client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});
console.log('Starting...')
client.login(process.env.BOT_TOKEN);
