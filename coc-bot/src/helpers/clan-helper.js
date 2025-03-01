import { getClans, getMember,getDiscord, getWar } from "../api/api_main.js";


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
        const value= warStats.clan.members.filter(member => member.opponentAttacks != 2).map(pendingRaids => { return { name: pendingRaids.name, discordStatus: false } })
    	console.log(value)
	return value
    })
}

const memberExtract = async () => {
	const values= getDiscord();
	console.log(values)
	return values
}

const createNotification = async () => {
     
}

export { clashspotUrl, memberExtract, pendingAttacks, retrieveMember }
