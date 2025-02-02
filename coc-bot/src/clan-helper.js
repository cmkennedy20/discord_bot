import env from "dotenv";
import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import { getClans } from "./api/api_main.js";


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

// getClans().then(result => { console.log(result) });

client.on("messageCreate", async (msg) => {
    if (msg.content === "h") {
        msg.channel.send("Entered")
        getClans().then(result => {
            msg.channel.send(result)
        });
        // getClans().then((data) => {
        //     console.log(data);
        //     // msg.channel.send(new MessageAttachments(images, '</h1 >'));
        // })
    }
});
