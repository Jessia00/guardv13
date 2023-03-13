const kanal = (event) => require(`../guard/channel/${event}`)
module.exports = client => {
  client.on("channelCreate", kanal("create"))
  client.on("channelDelete", kanal("delete"))
}