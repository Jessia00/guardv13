const emoji = (event) => require(`../guard/emoji/${event}`)
module.exports = client => {
  client.on("emojiCreate", emoji("create"))
  client.on("emojiDelete", emoji("delete"))
  client.on("emojiUpdate", emoji("update"))
}