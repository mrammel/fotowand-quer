const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const folderId = '17t-Qk9aTI2A5hwNEKp_y8mv5WUuENY--';
    const apiKey = 'AIzaSyC8EjkrlWKp_P_IJWiXC-an6i7u53Eh3a68';
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,thumbnailLink)`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Error fetching images' }),
            };
        }
        const data = await response.json();
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
