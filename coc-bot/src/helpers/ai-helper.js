import { postLlama, postImage } from "../api/api_main.js";

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

const imageGeneration = async (content) => {
    const summarizedMessage = await llamaQuery(content + ". Summarize this prompt and limit it to 75 tokens. This will be a prompt to generate an image so it should be formatted in a way which increases the quality of the generated content.");
    console.log("Summarized message :" + summarizedMessage)
    return postImage(summarizedMessage).then((res) => {
        return res
    })
        .catch((err) => console.error(err))
}

export { imageGeneration, llamaQuery }