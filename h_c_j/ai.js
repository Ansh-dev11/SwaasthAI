// Replace axios with fetch for browser compatibility
const API_KEY = "AIzaSyDvJCti-oG4HP7RDxpoC5pgXiTKPwOhdGM";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

async function askQuestion(question) {
    const headers = {
        "Content-Type": "application/json"
    };

    const body = JSON.stringify({
        contents: [
            {
                parts: [{ text: question }]
            }
        ]
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return `API request failed: ${error.message}`;
    }
}

// Example: Interactively ask questions
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Ask the AI anything! Type 'exit' to quit.");
rl.on('line', async (input) => {
    if (input.toLowerCase() === 'exit') {
        rl.close();
    } else {
        const answer = await askQuestion(input);
        console.log("AI:", answer);
    }
});
