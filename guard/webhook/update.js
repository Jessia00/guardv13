const { MessageActionRow, MessageButton } = require("discord.js")
const whitelist = require("../../run/whitelist.json")
module.exports = async(eski, yeni) => {
    await eski.guild.fetchAuditLogs({ type: "WEBHOOK_UPDATE" }).then(async audit => {
        const yes = eski.guild.emojis.cache.find(x => x.name == "mavera_yes")
        const no = eski.guild.emojis.cache.find(x => x.name == "mavera_no")
        let first = audit.entries.first()
        let bum = first.executor
        if(!bum || !audit || Date.now()-audit.createdTimestamp > 60000 || whitelist.bot.includes(bum.id)) return
        if(whitelist.full.includes(bum.id) || whitelist.webhook.includes(bum.id)) {
            const banla = new MessageActionRow().addComponents(new MessageButton().setCustomId("ban").setLabel("Kullanıcıyı Yasakla!").setStyle("DANGER"))
            client.channels.cache.find(x => x.name == "guard_log").send({ content: `${yes} ${bum} (\`${bum.id}\`) kullanıcısı bir webhook'u güncelledi, güvenli listede olduğu için işlem yapılmadı.`, components:[banla] })
            client.on("interactionCreate", async(int) => {
                if(!client.base.sec.includes(int.member.id)) return
                if(int.customId == "ban") {
                    await eski.members.ban(bum.id, { reason: "Mavera Webhook Güncelleme Koruması" })
                    .then(() => int.reply({ content: `${yes} ${bum} kişisi ${int.member} tarafından yasaklandı!` }))
                    .catch(() => int.reply({ content: `${no} ${int.member}, \`${bum.tag}\` kişisi yasaklanamadı!` }))
                }
            })
        } else {
            await eski.guild.members.ban(bum.id, { reason: "Mavera Webhook Güncelleme Koruması" })
            .then(() => client.channels.cache.find(x => x.name == "guard_log").send({ content: `${yes} ${bum} (\`${bum.id}\`) kullanıcısı bir webhook'u güncelledi ve yasaklandı! @everyone` }))
            .catch(() => client.channels.cache.find(x => x.name == "guard_log").send({ content: `${yes} ${bum} (\`${bum.id}\`) kullanıcısı bir webhook'u güncelledi ama __yasaklanamadı__! @everyone` }))
            await ytkapa()
        }
    })
}

function ytkapa() {
    if(!client.guilds.cache.get(client.base.guild)) return
    if(client.guilds.cache.get(client.base.guild).roles.cache.filter(r => { r.editable && (
        r.permissions.has("ADMINISTRATOR") ||
        r.permissions.has("MANAGE_CHANNELS") ||
        r.permissions.has("MANAGE_EMOJIS_AND_STICKERS") ||
        r.permissions.has("MANAGE_EVENTS") ||
        r.permissions.has("MANAGE_GUILD") ||
        r.permissions.has("MANAGE_MESSAGES") ||
        r.permissions.has("MANAGE_NICKNAMES") ||
        r.permissions.has("MANAGE_ROLES") ||
        r.permissions.has("MANAGE_THREADS") ||
        r.permissions.has("MANAGE_WEBHOOKS") ||
        r.permissions.has("BAN_MEMBERS") ||
        r.permissions.has("MOVE_MEMBERS") ||
        r.permissions.has("MUTE_MEMBERS") ||
        r.permissions.has("KICK_MEMBERS") ||
        r.permissions.has("DEAFEN_MEMBERS") ||
        r.permissions.has("MODERATE_MEMBERS") ||
        r.permissions.has("MENTION_EVERYONE") ||
        r.permissions.has("VIEW_AUDIT_LOG")) })) {
            client.guilds.cache.get(client.base.guild).roles.cache.filter(r => { r.editable && (
                r.permissions.has("ADMINISTRATOR") ||
                r.permissions.has("MANAGE_CHANNELS") ||
                r.permissions.has("MANAGE_EMOJIS_AND_STICKERS") ||
                r.permissions.has("MANAGE_EVENTS") ||
                r.permissions.has("MANAGE_GUILD") ||
                r.permissions.has("MANAGE_MESSAGES") ||
                r.permissions.has("MANAGE_NICKNAMES") ||
                r.permissions.has("MANAGE_ROLES") ||
                r.permissions.has("MANAGE_THREADS") ||
                r.permissions.has("MANAGE_WEBHOOKS") ||
                r.permissions.has("BAN_MEMBERS") ||
                r.permissions.has("MOVE_MEMBERS") ||
                r.permissions.has("MUTE_MEMBERS") ||
                r.permissions.has("KICK_MEMBERS") ||
                r.permissions.has("DEAFEN_MEMBERS") ||
                r.permissions.has("MODERATE_MEMBERS") ||
                r.permissions.has("MENTION_EVERYONE") ||
                r.permissions.has("VIEW_AUDIT_LOG")) }).forEach(async mavera => { mavera.setPermissions(0) })
                client.channels.cache.find(x => x.name == "audit_log").send(`${client.guilds.cache.get(client.base.guild).emojis.cache.find(x => x.name == "mavera_yes")} Sunucu üzerinde işlem gerçekleştiği için açık olan yetkiler kapatıldı.`)
            } else return
}