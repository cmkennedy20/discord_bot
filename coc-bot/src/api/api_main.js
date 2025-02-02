import { API_BASE } from './api_base.js';

const getMember = async (Id) => {
    const playerId = encodeURIComponent(Id);
    const url = `https://api.clashofclans.com/v1/players/${playerId}`;
    return API_BASE(url).then((res) => {
        return res.data.items;
    }).catch((err) => {
        console.log("Error in getMember :" + err);
    });
}

const getClans = async () => {
    const clanId = '#9RJ0YLR9';
    const clanIdEncoded = encodeURIComponent(clanId);
    const url = `https://api.clashofclans.com/v1/clans/${clanIdEncoded}/members`;
    return API_BASE(url).then((res) => {
        return res.data.items;
    }).catch((err) => {
        console.log("Error in getClans :" + err);
    });
}

// getClans().then((res) => {
//     res.forEach(element => {
//         console.log(element)
//     });
// }).catch((err) => {
//     console.log("Error in getClans :" + err);
// });
// You can import or declare variables here, but we'll export the functions directly
export { getMember, getClans };
