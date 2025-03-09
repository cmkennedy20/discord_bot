import { postLlama } from "../api/api_main.js";

const llamaQuery = async (content) => {
    return postLlama(content).then((res) => {
        let result = ""
        if (typeof res !== 'string') {
            console.error('Invalid response type');
            return;
        }
        if (res.length <= 2000) {
            result = res;
        } else {
            const truncatedRes = res.substring(0, 1895);
            result = truncatedRes + '\n**Truncated due to character limit. Original message was too long.**'
        }
        return result
    }).catch((err) => console.error(err))
}

export { llamaQuery }