import env from "dotenv";

import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';
import { getClans } from './api/api_main.js'
import { memberNameExtractor } from './helpers/data-formatter.js'

env.config();

var rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function updateCommands() {
    try {
        getClans().then(members => {
            var memberTypes = [{ name: 'member', value: 'member' }, { name: 'admin', value: 'elder' }, { name: 'leader', value: 'leader' }]
            memberTypes.forEach((type) => {
                let memberNames = memberNameExtractor(members.filter(info => info.role.toLowerCase().includes(type.name)))
                let choiceList = []
                memberNames.forEach((name) => {
                    choiceList.push({
                        name: name,
                        value: name,
                    })
                }
                )
                let commands = [
                    {
                        name: `${type.value}-stats`,
                        description: `Display the ${type.value} stats of a user`,
                        options: [
                            {
                                name: type.value,
                                description: `The stats for ${type.value}.`,
                                type: ApplicationCommandOptionType.String,
                                required: true,
                                choices: choiceList
                            }
                        ],
                    },
                ]
                console.log(`${type.value}-stats: ` + commands)
                let output = rest.put(
                    Routes.applicationGuildCommands(
                        process.env.CLIENT_ID,
                        process.env.GUILD_ID
                    ),
                    { body: commands }
                ).then(() => {
                    console.log(`Successfully updated the slash command for ${type.value}-stats`);
                }).catch(console.error);
            })
        })
    }
    catch (error) {
        console.log(`There was an error ${error}`);
    }
};

export { updateCommands };
