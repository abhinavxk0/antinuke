module.exports = async (Discord, client, member) => {
  const guild = member.guild;
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: "BOT_ADD",
  });
  const botAddAuditLogs = fetchedLogs.entries.first();
  const { executor, target } = botAddAuditLogs;
  if (!target.id === '873104705033740308') return;


  if (!member.user.bot) return;
  if (member.guild.id !== "768453184464748634") return;
  const botautoBanLogs = client.channels.cache.get("875696103205527563");
  const errorLogs = client.channels.cache.get("875700619506241546");

  if (!botAddAuditLogs)
    return errorLogs.send(
      "A bot was added but no relevant audit logs were found."
    );
  if (member.user.id === "822424076491554827") return;
  
  // if january11#8811 adds bot it wont kick it
  if (executor.id === '307777831625293825') return;
  if (member.user.bot) {
    member
      .ban()
      .catch((e) => errorLogs.send(e))
      .then(
        botautoBanLogs.send(
          new Discord.MessageEmbed()
            .setDescription(
              `${executor} added ${target} to ${guild.name}.\n${target} was successfully banned by ${client.user}`
            )
            .setColor("#00FFFF")
            .addField("Executor ID", `\`\`\`${executor.id}\`\`\``)
            .addField("Tag + Discriminator", `\`\`\`${executor.tag}\`\`\``)
            .addField("Bot ID", `\`\`\`${target.id}\`\`\``)
            .addField("Tag + Discriminator", `\`\`\`${target.tag}\`\`\``)
        )
      )
      .then(
        executor.send(
          `Your attempt at adding ${target.tag} to ${guild.name} was unsuccessful!`
        )
      )
      .catch((e) => errorLogs.send(e));
  }
};