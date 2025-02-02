import env from "dotenv";
import { Client, GatewayIntentBits, ActivityType, AttachmentBuilder } from "discord.js";
import nodeHtmlToImage from 'node-html-to-image'
import { clanHtmlDocument } from './helpers/html-constructor.js'
import { updateCommands } from './register-commands.js'

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

client.on("messageCreate", async (msg) => {
    if (msg.content === "h") {
        msg.channel.send("Entered")
        updateCommands().then(() => {
            clanHtmlDocument().then(html => {
                nodeHtmlToImage({
                    output: './image.png',
                    html: html,
                    content: { name: 'AnotherName' }
                })
                    .then(() => {
                        const attachment = new AttachmentBuilder('./image.png');
                        msg.channel.send({ content: 'Here is your file:', files: [attachment] });
                    })
                    .catch((err) => console.log(err));

                // Send the attachment with a message

            }).catch((err) => console.log(err))
        })
    }
});
