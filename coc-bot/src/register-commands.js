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
            let commands = [{
                name: 'sync-members',
                description: 'Sync the members list with the current clan roster.',
            },
            {
                name: 'clan-info',
                description: 'Get information about the clan.',
            },
            {
                name: 'active-war',
                description: 'List the remaining attacks in active war'
            },
            {
                name: 'active-cwl',
                description: 'List the remaining attacks in active cwl'
            }
            ];
            memberTypes.forEach((type) => {
                let memberNames = memberNameExtractor(members.filter(info => info.role.toLowerCase().includes(type.name)))
                let choiceList = [];
                choiceList.push
                memberNames.forEach((name) => {
                    choiceList.push({
                        name: name,
                        value: name,
                    })
                }
                )
                commands.push(
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
                    })

                console.log(`${type.value}-stats: ` + commands)
            })
            rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    process.env.GUILD_ID
                ),
                { body: commands }
            ).then(() => {
                console.log(`Successfully updated the slash commands!`);
            }).catch(console.error)
        })
    }
    catch (error) {
        console.log(`There was an error ${error}`);
    }
};

export { updateCommands };
