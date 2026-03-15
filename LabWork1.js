// Білаш Олексій / ІМ-52
// ==========================================
// Task 1: Generators and Iterators
// ==========================================
// Random Number Generator
// ==========================================

function* randomNumberGenerator(min = 1, max = 100) {
    while (true) {
        yield Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

async function consumeIteratorWithTimeout(iterator, timeoutSeconds) {
    const startTime = Date.now();
    const timeoutMs = timeoutSeconds * 1000;
    
    let total = 0;
    let count = 0;

    console.log(`Start Processing. Timeout: ${timeoutSeconds} seconds...`);
    console.log("--------------------------------------------------");

    while (Date.now() - startTime < timeoutMs) {
        const result = iterator.next();

        if (result.done) {
            break; 
        }

        const value = result.value;
        total += value;
        count++;
        const avg = total / count;

        console.log(`[Iteration ${count}] Recieved: ${value} | Total Amount: ${total} | Average: ${avg.toFixed(2)}`);

        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log("--------------------------------------------------");
    console.log(`Uh-oh, Time's up! Processed values: ${count} in ${timeoutSeconds} seconds.`);
}

// ==========================================
// Execution
// ==========================================

const myRandomGen = randomNumberGenerator(10, 50);

consumeIteratorWithTimeout(myRandomGen, 3);