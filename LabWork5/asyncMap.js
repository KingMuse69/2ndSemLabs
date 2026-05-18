// Bilash Oleksii | IM-52
//=================================

function mapAsyncCallback(array, callback, finalCallback) {
    let results = [];
    let completed = 0;
    if (array.length === 0) return finalCallback([]);

    array.forEach((item, index) => {
        setTimeout(() => {
            callback(item, (result) => {
                results[index] = result;
                completed++;
                if (completed === array.length) {
                    finalCallback(results);
                }
            });
        }, 100);
    });
}

function mapAsyncPromise(array, asyncCallback) {
    const promises = array.map((item, index) => asyncCallback(item, index));
    return Promise.all(promises);
}

async function mapAsyncWithAbort(array, asyncCallback, signal) {
    const results = [];
    for (let i = 0; i < array.length; i++) {
        if (signal?.aborted) {
            throw new Error("Operation aborted by the user");
        }
        results.push(await asyncCallback(array[i], i));
    }
    return results;
}

module.exports = { 
    mapAsyncCallback, 
    mapAsyncPromise, 
    mapAsyncWithAbort 
};