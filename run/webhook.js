const webhook = (event) => require(`../guard/webhook/${event}`)
module.exports = client => {
  client.on("webhookUpdate", webhook("create"))
  client.on("webhookUpdate", webhook("delete"))
  client.on("webhookUpdate", webhook("update"))
}