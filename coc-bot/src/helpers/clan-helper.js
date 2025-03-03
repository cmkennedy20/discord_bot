import { getClans, getMember, getDiscord, getWar } from "../api/api_main.js";


function clashspotUrl(memberId) {
    return `https://clashspot.net/en/player/${memberId}/war-attacks/home-village`
}
const retrieveMember = async (memberName) => {
    return getClans().then(members => {
        const memberTag = members.filter(member => member.name == memberName)[0].tag
        return getMember(memberTag).then(member => {
            return member
        })
    })
}

const pendingAttacks = async () => {
    return getWar().then(warStats => {
        return warStats.clan.members.filter(member => member.attacks == undefined || member.attacks.length != 2).map(pendingRaids => { return pendingRaids.name })
    })
}

const createDiscordNotification = async () => {
    return pendingAttacks().then(pendingAttacks => {
        return getDiscord().then(discordMembers => {
            let discordKeys = Object.keys(discordMembers.data);
            let discordNames = pendingAttacks.filter(item => discordKeys.includes(item));
            const discordTags = discordNames.map(key => discordMembers.data[key]);
            const message = discordTags.map(name => `<@${name}>`).join(' , ') + ' use your war raids you fucking dumb idiots';
            return message
        })
    })
}

const createClashNotification = async () => {
    return pendingAttacks().then(pendingAttacks => {
        const maxPerMessage = 5;
        let messages = [];
        for (let i = 0; i < pendingAttacks.length; i += maxPerMessage) {
            const batch = pendingAttacks.slice(i, i + maxPerMessage);
            const message = batch.map(name => `@${name}`).join(' , ') + ' use your war raids';
            messages.push(message);
        }
        return messages
    })
}

export { clashspotUrl, createClashNotification, createDiscordNotification, pendingAttacks, retrieveMember }
