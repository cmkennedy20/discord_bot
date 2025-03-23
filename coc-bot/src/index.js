import env from "dotenv";
import { Client, GatewayIntentBits, AttachmentBuilder } from "discord.js";
import { updateCommands } from './register-commands.js'
import { createClashNotification, createDiscordNotification } from "./helpers/clan-helper.js";
import { promptCreation, imageGeneration } from "./helpers/ai-helper.js";
env.config();

const token = process.env.DISCORD_TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],

});

client.login(token);

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    switch (interaction.commandName) {
        case "sync-members":
            await updateCommands();
            interaction.reply({ content: 'Members synced :white_check_mark: ' });
            break;
        // case "member-stats":
        //     var playerName = interaction.options.get("member").value;
        //     retrieveMember(playerName).then(memberStats => {
        //         interaction.reply({
        //             content: clashspotUrl(memberStats.tag.split("#")[1])
        //         })
        //     })
        //     break;
        // case "elder-stats":
        //     var playerName = interaction.options.get("elder").value;
        //     retrieveMember(playerName).then(memberStats => {
        //         interaction.reply({
        //             content: clashspotUrl(memberStats.tag.split("#")[1])
        //         })
        //     })
        //     break;
        // case "leader-stats":
        //     var playerName = interaction.options.get("leader").value;
        //     retrieveMember(playerName).then(memberStats => {
        //         interaction.reply({
        //             content: clashspotUrl(memberStats.tag.split("#")[1])
        //         })
        //     })
        //     break;
        case "active-war":
            const channel = client.channels.cache.get(interaction.channelId)
            createDiscordNotification().then(notification => {
                interaction.reply({
                    content: notification
                })
            })
            channel.send("\nContent to copy to Clash of Clans")
            createClashNotification().then(notification => {
                notification.forEach(message => {
                    channel.send(message)
                });
            })
            break;
        // case "clan-info":
        //     clanHtmlDocument().then(html => {
        //         nodeHtmlToImage({
        //             output: './image.png',
        //             html: html,
        //             content: { name: 'AnotherName' }
        //         })
        //             .then(() => {
        //                 const attachment = new AttachmentBuilder('./image.png');
        //                 interaction.reply({ content: 'Here is your file:', files: [attachment] });
        //             })
        //             .catch((err) => console.log(err));
        //     }).catch((err) => console.log(err))
        //     break;
        default:
            console.log(interaction);
    }
});

client.on('messageCreate', (message) => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Check if the bot is mentioned
    if (message.mentions.has(client.user)) {
        const inputMessage = message.content.split(">")[1]
        promptCreation(inputMessage).then(response => {
            switch (response.type) {
                case "image":
                    const attachment = new AttachmentBuilder('./assets/misc/loading_1.gif');
                    message.reply({
                        content: "Generating Image...",
                        files: [attachment]
                    })
                        .then(msg => {
                            imageGeneration(inputMessage).then(result => {
                                // Create an attachment
                                const attachment = new AttachmentBuilder(result, { name: 'image.png' });
                                msg.edit({
                                    content: "Generated Image",
                                    files: [attachment]
                                })
                            })
                        });
                    break;
                default:
                    message.reply(response.prompt)
                    break;
            }
        }).catch(err => console.log(err));
    }
})
