//Bilash Oleksii || IM-52

//==================================

async function* largeDataGenerator(totalItems) {
    for (let i = 1; i <= totalItems; i++) {
        await new Promise(resolve => setTimeout(resolve, 10)); 
        yield { id: i, value: Math.random() * 100 };
    }
}


async function processDataStream(generator) {
    let count = 0;
    let sum = 0;

    console.log("--- Starting Data Processing ---");

    for await (const chunk of generator) {
        count++;
        sum += chunk.value;

        if (count % 10 === 0) {
            console.log(`Processed items: ${count}. Current average: ${(sum / count).toFixed(2)}`);
        }
    }

    return { total: count, average: sum / count };
}


module.exports = { 
    largeDataGenerator, 
    processDataStream 
};