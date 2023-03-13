const member = (event) => require(`../guard/member/${event}`)
module.exports = client => {
  client.on("guildBanAdd", member("ban"))
  client.on("guildBanRemove", member("unban"))
}