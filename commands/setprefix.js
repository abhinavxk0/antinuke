const db = require('quick.db')

module.exports = {
    name: 'setprefix',
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply('You do not have permissions to use this command.')
        const newprefix = args.join(" ");

        if (!newprefix) return message.lineReply('Please enter a prefix!')
        if (newprefix.length > 5) return message.lineReply('The prefix you entered was too long! It should be less that 5 characters.')
        message.lineReply(`The guild's prefix has been set to \`${newprefix}\`!`)
        db.set(`prefix.${message.guild.id}`, newprefix)
    }
}