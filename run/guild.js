const guild = (event) => require(`../guard/guild/${event}`)
module.exports = client => {
  client.on("guildUpdate", guild("update_all"))
}