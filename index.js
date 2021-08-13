const { exec } = require('child_process');
const Discord = require('discord.js');
                require('discord-reply')
const client = new Discord.Client();
const fs = require('fs');
const prefix = '$$';


client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();


const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {

    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {

        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);

    }

}
client.once('ready', () => {
    console.log(`${client.user.tag} is online!`)
    client.user.setPresence({
        status: 'invisible'
    })
        .catch(console.error);
})


client.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot || (!message.guild)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.lineReply(`A little too fast here!\n Wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(client, command, message, args, Discord);
    } catch (error) {
        console.error(error);
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#99e6ff')
                .setDescription(`There was an error performing this task.`)
        );
    }
});


client.on('guildMemberAdd', async (member) => {
    if (!member.user.bot) return;
    if (member.guild.id !== '768453184464748634') return;

    const guild = member.guild;
    const fetchedLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'BOT_ADD'
    });
    const botAddAuditLogs = fetchedLogs.entries.first();
    const { executor, target } = botAddAuditLogs;
    const botautoBanLogs = client.channels.cache.get('875696103205527563')
    const errorLogs = client.channels.cache.get('875700619506241546')
    if (!botAddAuditLogs) return errorLogs.send('A bot was added but no relevant audit logs were found.');
    if (member.user.bot) {
        member.ban().catch(
            e => errorLogs.send(e)
        )
        botautoBanLogs.send( 
            new Discord.MessageEmbed()
                .setDescription(`${executor} added ${target} to ${guild.name}.\n${target} was successfully banned by ${client.user}`)
                .setColor('#00FFFF')
                .addField('ID', executor.id)
                .addField('Tag + Discriminator', executor.tag)
        )
    }
})

client.login('ODczNjExODY3MDYxMzc5MTIy.YQ68dA.NaL1PKK4XZFEwOxSuHwyvZhqxjU');