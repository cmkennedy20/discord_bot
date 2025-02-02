import { getClans } from '../api/api_main.js'
import { writeFile } from 'fs';
import { memberNameExtractor, roleFormatter } from './data-formatter.js'

function imageUrl(townhall) {
    switch (townhall) {
        case 14:
            return `https://static.wikia.nocookie.net/clashofclans/images/4/48/Giga_Inferno14-5.png`;
        case 15:
            return `https://static.wikia.nocookie.net/clashofclans/images/1/1d/Giga_Inferno15-5.png`;
        case 16:
            return `https://static.wikia.nocookie.net/clashofclans/images/b/bd/Giga_Inferno16.png`;
        case 17:
            return `https://static.wikia.nocookie.net/clashofclans/images/9/9a/Inferno_Artillery5.png`;
        default:
            return `https://i.pinimg.com/originals/91/86/a4/9186a4f4d3f24827af0cead5a779936c.png`
    }

}
function tableFormatter(data) {
    let html_table = ''
    // console.log(data)
    for (let i = 0; i < data.length; i++) {
        var member = data[i]
        // console.log(member)
        html_table += `
            <tr>
                <td scope="row">${member.name} - ${member.expLevel}</td>
                <td data-title="Role">${roleFormatter(member.role)}</td>
                <td data-title="Town Hall Level"><img src="${imageUrl(member.townHallLevel)}" width="36" height="36" ></img></td>
                <td data-title="Donations">${member.donations} / ${member.donationsReceived}</td>
                <td data-title="League" >${member.trophies}<img src="${member.league.iconUrls.tiny}"></img></td>
                <td data-title="Player Tag">${member.tag}</td>
            </tr>
            `
    }
    return html_table
}

export function clanHtmlDocument() {

    return getClans().then(clan => {
        var html_doc = tableFormatter(clan)
        var beginning = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Discord Server</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #76858a;
                    color: #333;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                }
                header {
                    background-color: #cab70e;
                    color: white;
                    padding: 20px;
                }
                table {
                    width: 80%;
                    margin: 50px auto;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                th {
                    background-color: #cab70e;
                    color: white;
                }
                tr:nth-child(even) {
                    background-color: #bbdefb;
                }
                tr:hover {
                    background-color: #90caf9;
                }
                img {
                    max-width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>

            <img src="https://www.pedagojeux.fr/wp-content/uploads/2020/06/clash-loadingscreen-2019aug.jpg" alt="Server Image">
            <div class="container">
        <table class="responsive-table">
            <thead>
            <tr>
                <th scope="col">Player Name & Level </th>
                <th scope="col">Role</th>
                <th scope="col">Townhall</th>
                <th scope="col">Donations(dontated/received)</th>
                <th scope="col">Trophy Level</th>
                <th scope="col">Player Tag</th>
            </tr>
            </thead>
            <tfoot>
            </tfoot>
            <tbody>
        `;
        beginning += html_doc;
        beginning += `
                    </tbody>
        </table>
        </div>
        </body>
        </html>
        `
        var html_final = beginning
        writeFile('testing.html', html_final, (error) => {
            if (error) {
                console.error('Error writing to file:', error);
            } else {
                console.log(`File written successfully`);
            }
        });
        return html_final;
    })
}
