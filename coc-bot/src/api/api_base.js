
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

export function API_BASE_NO_AUTH_POST(url, message) {
    let data = JSON.stringify({
        "prompt": message
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data,
    };
    return axios.request(config)
        .then(response => {
            // Extract the Base64 string
            let base64Image = response.data.image_base64;
            // Handle MIME type prefix (if present)
            if (base64Image.startsWith('data:image')) {
                base64Image = base64Image.split(',')[1];  // Remove MIME prefix
            }
            // Decode Base64 to binary
            const imageBuffer = Buffer.from(base64Image, 'base64');
            // Return the binary image buffer as a Blob object
            return imageBuffer
        })
}

export function API_LLAMA_BASE_NO_AUTH(url, input) {
    let data = JSON.stringify({
        "model": "llama3.2:1b",
        "stream": false,
        "messages": [
            {
                "role": "user",
                "content": input + "Keep the response under 1999 characters."
            }
        ]
    });
    let config = {
        method: 'post',
        maxBodyLength: 1999,
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    return axios.request(config)
        .then((response) => {
            return response.data.message.content;
        })
        .catch((error) => {
            console.log(error);
        });
}