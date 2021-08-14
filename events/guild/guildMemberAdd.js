module.exports = async (Discord, client, member) => {
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
        ).then(botautoBanLogs.send( 
            new Discord.MessageEmbed()
                .setDescription(`${executor} added ${target} to ${guild.name}.\n${target} was successfully banned by ${client.user}`)
                .setColor('#00FFFF')
                .addField('ID', executor.id)
                .addField('Tag + Discriminator', executor.tag)
        )).then(
            executor.send(`abe sasti nuker ki aulad apne aukat mein reh nai toh teri maa ki aisa gand marunga sath pushte bina gand ke niklenge`)
        ).catch(
            e => errorLogs.send(e)
        )
    }
}