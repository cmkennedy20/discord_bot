import { getClans, getMember, getWar } from "../api/api_main.js";


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
        return warStats.clan.members.filter(member => member.opponentAttacks != 2).map(pendingRaids => { return { name: pendingRaids.name, discordStatus: false } })
    })
}

pendingAttacks()

export { clashspotUrl, retrieveMember }

