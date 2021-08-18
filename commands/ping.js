const moment = require('moment');

module.exports = {
    name: 'ping',
    execute(client, message, args, Discord) {

        const errorLogs = client.channels.cache.get('875700619506241546')

        const d = moment.duration(client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const seconds = (d.seconds() == 1) ? `${d.seconds()} seconds` : `${d.seconds()} seconds`;
        const minutes = (d.minutes() == 1) ? `${d.minutes()} minutes` : `${d.minutes()} minutes`;
        if (message.author.id !== '776097608933441568') return;

        try {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setTitle('Pong!')
                    .setDescription(`\`\`\`WS Ping: ${Math.round(client.ws.ping)}ms\nUptime: ${days}, ${hours}, ${minutes} and ${seconds}\`\`\``)
                    .setColor('#00FFFF')
            )
        } catch (err) {
            errorLogs.send(err.message)
        }

    }
}