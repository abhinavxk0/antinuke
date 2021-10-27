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

client.login('ODczNjExODY3MDYxMzc5MTIy.YQ68dA.wYS4_K3_y9Wbd-6xyOa8igm8rpc');
