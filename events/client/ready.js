module.exports = (Discord, client) => {
  console.log(`${client.user.tag} is online!`);

  client.user.setPresence({
    status: "invisible",
  });
};
