// Bilash Oleksii || IM-52

//==================================

const { largeDataGenerator, processDataStream } = require('./processor');

async function run() {

    const dataStream = largeDataGenerator(50);

    try {
        const stats = await processDataStream(dataStream);
        console.log("--- Data Processing Completed ---");
        console.log(`Total items processed: ${stats.total}`);
        console.log(`Final average value: ${stats.average.toFixed(2)}`);
    } catch (error) {
        console.error("Error during processing:", error);
    }
}

run();