
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

export function API_BASE(url) {
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.CLASH_TOKEN}`,
        },
    })
}

export function API_BASE_NO_AUTH(url) {
    return axios.get(url)
}
