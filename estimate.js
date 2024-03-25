// estimate.js

const fs = require('fs');

let laughterCounts = [];

function estimateData() {
    const firstValue = laughterCounts[0];
    const lastValue = laughterCounts[laughterCounts.length - 1];
    const difference = lastValue - firstValue;
    const averageDifference = difference / laughterCounts.length;
    const estimatedValue = lastValue + averageDifference;

    laughterCounts.push(estimatedValue);

    console.log("Estimated laughter count:", estimatedValue);

    // Write the estimated value to a file
    fs.writeFileSync('estimatedValue.txt', String(estimatedValue)); 

    return estimatedValue;
}

async function fetchData() {
    try {
        const response = await fetch('https://dadlaughbutton.stats100.xyz');
        const data = await response.json();
        
        laughterCounts.push(data.laughterCount);
        if (laughterCounts.length > 60 * 30) laughterCounts.shift()

        console.log("Data received:", data);
    } catch (error) {
        console.error("Error fetching data:", error);
        estimateData();
    }
}

function makeRequest() {
    setInterval(fetchData, 1000);
}

makeRequest();

module.exports = { estimateData };
