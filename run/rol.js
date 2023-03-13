const rol = (event) => require(`../guard/role/${event}`)
module.exports = client => {
  client.on("roleCreate", rol("create"))
  client.on("roleDelete", rol("delete"))
}