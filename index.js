const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const { readdir, writeFile } = require("fs")
const client = (global.client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_INTEGRATIONS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_BANS,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Intents.FLAGS.GUILD_INVITES,
  Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Intents.FLAGS.GUILD_WEBHOOKS,
  Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
  Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_MESSAGES
], presence: { activities: [{ name: "Mavera ❤️ 1913" }], status: "dnd" }, restTimeOffset: 60 }))
const whitelist = require("./run/whitelist.json")
require("./run/rol")(client)
require("./run/channel")(client)
require("./run/member")(client)
require("./run/emoji")(client)
require("./run/guild")(client)
require("./run/webhook")(client)
client.base = {
  token:"OTg5MTU5MTE2NTUzNDYxODEx.G5N8tg.Ia7MhO9d8qPks57Y1H1LYzrU1nOLSsLzhO_f4Q",
  prefix:"!",
  guild:"956564567817854986",
  mongo:"",
  url:"1913",
  sec:["983309390164000768", "238398927479635969"],
  dev:["983409390164000768"]
}
client.login(client.base.token).then(() => console.log("Guard giriş yaptı!")).catch(() => console.error("Guard tokenininde bir sorun meydana geldi!"))
//other (member & updates)

client.on("messageCreate", async msg => {
  if(!client.base.dev.includes(msg.author.id)) return
  let args = msg.content.split(" ").slice(1)
  let uye = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
  if(msg.content.includes(client.base.prefix+"eval")) {
    if(!args[0]) return
    let kod = args.join(" ")
    function abc(text) {
        if(typeof text != "string") text = require("util").inspect(text, { depth: 0 })
        text = text.replace(/`/g, '`' + String.fromCharCode(8203).replace(/@/g, '@' + String.fromCharCode(8203))) 
        return text
    } try {
        var mav = abc(await eval(kod))
        if(mav.match(new RegExp(`${client.token}`, "g"))) mav.replace(client.token, "tm")
        msg.reply({ content:`${mav.replace(client.token,"tm")}`, code: "js", split: true })
    } catch(err) { msg.reply({ content:err, code: "js", split: true }) }
  }
  if(msg.content.includes(client.base.prefix+"rol")) {
    if(!uye) return msg.reply({ content:`${whitelist.rol.map(x => `<@${x}>`).join(", ")||"Lütfen bir üye belirtin."}` })
    let rol = whitelist.rol || []
    if(rol.some(x => x.includes(uye.id))) {
      rol = rol.filter(x => !x.includes(uye.id))
      whitelist.rol = rol
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi rol kategorisindeki güvenli listeden kaldırıldı.` })
    } else {
      whitelist.rol.push(`${uye.id}`)
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi rol kategorisindeki güvenli listeye eklendi.` })
    }
  }
  if(msg.content.includes(client.base.prefix+"kanal")) {
    if(!uye) return msg.reply({ content:`${whitelist.kanal.map(x => `<@${x}>`).join(", ")||"Lütfen bir üye belirtin."}` })
    let kanal = whitelist.kanal || []
    if(kanal.some(x => x.includes(uye.id))) {
      kanal = kanal.filter(x => !x.includes(uye.id))
      whitelist.kanal = kanal
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi kanal kategorisindeki güvenli listeden kaldırıldı.` })
    } else {
      whitelist.kanal.push(`${uye.id}`)
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi kanal kategorisindeki güvenli listeye eklendi.` })
    }
  }
  if(msg.content.includes(client.base.prefix+"emoji")) {
    if(!uye) return msg.reply({ content:`${whitelist.emoji.map(x => `<@${x}>`).join(", ")||"Lütfen bir üye belirtin."}` })
    let emoji = whitelist.emoji || []
    if(emoji.some(x => x.includes(uye.id))) {
      emoji = emoji.filter(x => !x.includes(uye.id))
      whitelist.emoji = emoji
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi emoji kategorisindeki güvenli listeden kaldırıldı.` })
    } else {
      whitelist.emoji.push(`${uye.id}`)
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi emoji kategorisindeki güvenli listeye eklendi.` })
    }
  }
  if(msg.content.includes(client.base.prefix+"emoji")) {
    if(!uye) return msg.reply({ content:`${whitelist.emoji.map(x => `<@${x}>`).join(", ")||"Lütfen bir üye belirtin."}` })
    let emoji = whitelist.emoji || []
    if(emoji.some(x => x.includes(uye.id))) {
      emoji = emoji.filter(x => !x.includes(uye.id))
      whitelist.emoji = emoji
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi emoji kategorisindeki güvenli listeden kaldırıldı.` })
    } else {
      whitelist.emoji.push(`${uye.id}`)
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi emoji kategorisindeki güvenli listeye eklendi.` })
    }
  }
  if(msg.content.includes(client.base.prefix+"webhook")) {
    if(!uye) return msg.reply({ content:`${whitelist.webhook.map(x => `<@${x}>`).join(", ")||"Lütfen bir üye belirtin."}` })
    let webhook = whitelist.webhook || []
    if(webhook.some(x => x.includes(uye.id))) {
      webhook = webhook.filter(x => !x.includes(uye.id))
      whitelist.webhook = webhook
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi webhook kategorisindeki güvenli listeden kaldırıldı.` })
    } else {
      whitelist.webhook.push(`${uye.id}`)
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi webhook kategorisindeki güvenli listeye eklendi.` })
    }
  }
  if(msg.content.includes(client.base.prefix+"other")) {
    if(!uye) return msg.reply({ content:`${whitelist.other.map(x => `<@${x}>`).join(", ")||"Lütfen bir üye belirtin."}` })
    let other = whitelist.other || []
    if(other.some(x => x.includes(uye.id))) {
      other = other.filter(x => !x.includes(uye.id))
      whitelist.other = other
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi other kategorisindeki güvenli listeden kaldırıldı.` })
    } else {
      whitelist.other.push(`${uye.id}`)
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi other kategorisindeki güvenli listeye eklendi.` })
    }
  }
  if(msg.content.includes(client.base.prefix+"guild")) {
    if(!uye) return msg.reply({ content:`${whitelist.guild.map(x => `<@${x}>`).join(", ")||"Lütfen bir üye belirtin."}` })
    let guild = whitelist.guild || []
    if(guild.some(x => x.includes(uye.id))) {
      guild = guild.filter(x => !x.includes(uye.id))
      whitelist.guild = guild
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi guild kategorisindeki güvenli listeden kaldırıldı.` })
    } else {
      whitelist.guild.push(`${uye.id}`)
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi guild kategorisindeki güvenli listeye eklendi.` })
    }
  }
  if(msg.content.includes(client.base.prefix+"full")) {
    if(!uye) return msg.reply({ content:`${whitelist.full.map(x => `<@${x}>`).join(", ")||"Lütfen bir üye belirtin."}` })
    let full = whitelist.full || []
    if(full.some(x => x.includes(uye.id))) {
      full = full.filter(x => !x.includes(uye.id))
      whitelist.full = full
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi full kategorisindeki güvenli listeden kaldırıldı.` })
    } else {
      whitelist.full.push(`${uye.id}`)
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} üyesi full kategorisindeki güvenli listeye eklendi.` })
    }
  }
  if(msg.content.includes(client.base.prefix+"bot")) {
    if(!uye) return msg.reply({ content:`${whitelist.bot.map(x => `<@${x}>`).join(", ")||"Lütfen bir bot belirtin."}` })
    let bot = whitelist.bot || []
    if(bot.some(x => x.includes(uye.id))) {
      bot = bot.filter(x => !x.includes(uye.id))
      whitelist.bot = bot
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} botu güvenliden kaldırıldı.` })
    } else {
      whitelist.bot.push(`${uye.id}`)
      writeFile("./run/whitelist.json", JSON.stringify(whitelist), (err) => { if(err) console.log(err) })
      msg.reply({ content: `${uye} botu güvenliye eklendi.` })
    }
  }
  if(msg.content.includes(client.base.prefix+"wh")) {
    msg.reply({ embeds:[new MessageEmbed().setDescription(`${msg.guild.emojis.cache.find(x => x.name == "1913_mavera_star")} Full'deki Güvenliler:
${whitelist.full.map(x => `<@${x}>`).join(", ")||"Üye Bulunmuyor."}
─────────────────────
${msg.guild.emojis.cache.find(x => x.name == "1913_mavera_star")} Guild'deki Güvenliler:
${whitelist.guild.map(x => `<@${x}>`).join(", ")||"Üye Bulunmuyor."}
─────────────────────
${msg.guild.emojis.cache.find(x => x.name == "1913_mavera_star")} Rol'deki Güvenliler:
${whitelist.rol.map(x => `<@${x}>`).join(", ")||"Üye Bulunmuyor."}
─────────────────────
${msg.guild.emojis.cache.find(x => x.name == "1913_mavera_star")} Kanal'daki Güvenliler:
${whitelist.kanal.map(x => `<@${x}>`).join(", ")||"Üye Bulunmuyor."}
─────────────────────
${msg.guild.emojis.cache.find(x => x.name == "1913_mavera_star")} Emoji'deki Güvenliler:
${whitelist.emoji.map(x => `<@${x}>`).join(", ")||"Üye Bulunmuyor."}
─────────────────────
${msg.guild.emojis.cache.find(x => x.name == "1913_mavera_star")} Webhook'daki Güvenliler:
${whitelist.webhook.map(x => `<@${x}>`).join(", ")||"Üye Bulunmuyor."}
─────────────────────
${msg.guild.emojis.cache.find(x => x.name == "1913_mavera_star")} Other'deki Güvenliler:
${whitelist.other.map(x => `<@${x}>`).join(", ")||"Üye Bulunmuyor."}`).setFooter({ text: "Mavera ❤️ 1913" }).setColor("2f3136 ")] })
  }
})