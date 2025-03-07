import { API_BASE, API_BASE_NO_AUTH } from './api_base.js';

const getMember = async (Id) => {
    const playerId = encodeURIComponent(Id);
    const url = `https://api.clashofclans.com/v1/players/${playerId}`;
    return API_BASE(url).then((res) => {
        console.log(res.data)
        return res.data;
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

const getWar = async () => {
    const clanId = '#9RJ0YLR9';
    const clanIdEncoded = encodeURIComponent(clanId);
    const url = `https://api.clashofclans.com/v1/clans/${clanIdEncoded}/currentwar`;
    return API_BASE(url).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log("Error in getClans :" + err);
    });
}

const getDiscord = async () => {
    const value= API_BASE_NO_AUTH('http://python_api:5000')
    return value
}
// You can import or declare variables here, but we'll export the functions directly
export { getMember, getClans, getDiscord, getWar };
