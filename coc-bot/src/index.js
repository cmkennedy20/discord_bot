import env from "dotenv";
import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import grabFormattedEmbed from "./members.js"

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
        grabFormattedEmbed().then((data) => {
            msg.channel.send({ embeds: [data] });;
            // msg.channel.send(new MessageAttachments(images, '</h1 >'));
        })


    }
});
