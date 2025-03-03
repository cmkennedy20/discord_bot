import { EmbedBuilder } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const clanId = '#9RJ0YLR9';
const clanIdEncoded = encodeURIComponent(clanId);
const url = `https://api.clashofclans.com/v1/clans/${clanIdEncoded}/members`;

async function getMembers() {
    const result = axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.CLASH_TOKEN}`,
        },
    }).then(response => {
        return response.data.items;
    }).then(members => {
        // var memberList = members[0].name
        var memberList = []
        members.forEach((member) => {
            memberList.push({ name: member.name, role: member.role, expLevel: member.expLevel, trophies: member.trophies, donations: member.donations, received: member.donationsReceived })
        });
        return memberList
    }
    )
        .catch(error => {
            console.error('Error making the HTTP GET request:', error);
        });
    return result
}

async function formatMemberEmbed() {
    var result = getMembers().then(result => {
        const input = result;
        return input;
    })
    return result

}

// inside a command, event listener, etc.
async function grabFormattedEmbed() {
    // var result = JSON.stringify(await formatMemberEmbed())
    var result = await formatMemberEmbed()
    var exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Clan Members')
        .addFields({
            name: 'Name',
            value: 'Name'
        })
        .addFields({
            name: 'Role',
            value: 'Role',
            inline: true
        })
        .addFields({
            name: 'Level',
            value: 'Level',
            inline: true
        })
        .addFields({
            name: 'Trophies',
            value: 'Trophies',
            inline: true
        })
        .addFields({
            name: 'Donations',
            value: 'Donations',
            inline: true
        })
        .addFields({
            name: 'Received',
            value: 'Received',
            inline: true
        })
        .setDescription('A valid description')
        .setTimestamp();
    // console.log(exampleEmbed)
    let outputEmbed = exampleEmbed;
    for (let i = 0; i < result.length - 25; i++) {
        // result.forEach((item) => {
        var member = result[i]
        console.log(member.name, member.role, member.expLevel, member.trophies, member.donations, member.received)
        outputEmbed = EmbedBuilder.from(outputEmbed)
            .addFields({
                name: `NameValue${i}`,
                value: member.name
            })
            .addFields({
                name: `RoleValue${i}`,
                value: member.role,
                inline: true
            })
        // .addFields({
        //     name: 'LevelValue' + i,
        //     value: member.expLevel,
        //     inline: true
        // })
        // .addFields({
        //     name: 'TrophiesValue' + i,
        //     value: member.trophies,
        //     inline: true
        // })
        // .addFields({
        //     name: 'DonationsValue' + i,
        //     value: member.donations,
        //     inline: true
        // })
        // .addFields({
        //     name: 'ReceivedValue' + i,
        //     value: member.donationsReceived,
        //     inline: true
        // })
    }
    return outputEmbed
}

// getMembers()
// grabFormattedEmbed().then(result => {
//     console.log(result)
// })
export default grabFormattedEmbed;

