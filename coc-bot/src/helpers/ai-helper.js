import { generatePrompt, postImage } from "../api/api_main.js";

const responseLimiter = (content) => {
    let result = ""
    if (typeof content !== 'string') {
        console.error('Invalid response type');
        return;
    }
    if (content.length <= 2000) {
        result = content;
    } else {
        const truncatedRes = content.substring(0, 1895);
        result = truncatedRes + '\n**Truncated due to character limit. Original message was too long.**'
    }
    return result
}

const imageGeneration = async (content) => {
    return postImage(content).then((res) => {
        return res
    })
        .catch((err) => console.error(err))
}

const promptCreation = async (content) => {
    const result = generatePrompt(content);
    return result
}

export { promptCreation, imageGeneration, responseLimiter }