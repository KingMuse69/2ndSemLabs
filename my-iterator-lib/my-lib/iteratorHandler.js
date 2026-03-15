export async function consumeIteratorWithTimeout(iterator, timeoutSeconds) {
    const startTime = Date.now();
    const timeoutMs = timeoutSeconds * 1000;
    let total = 0, count = 0;

    while (Date.now() - startTime < timeoutMs) {
        const { value, done } = iterator.next();
        if (done) break;

        total += value;
        count++;
        console.log(`[${count}] Value: ${value} | Avg.: ${(total / count).toFixed(2)}`);

        await new Promise(res => setTimeout(res, 100));
    }
    console.log(`completed. Processed: ${count}`);
}