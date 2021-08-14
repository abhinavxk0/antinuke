const cooldowns = new Map()

module.exports = (Discord, client, message) => {
    const prefix = '$$'

    if (!message.content.startsWith(prefix) || message.author.bot || (!message.guild)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if (current_time < expiration_time) {
            const timeLeft = (expiration_time - current_time) / 1000;

            return message.channel.lineReply(`A little too fast here!\n Wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

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
}